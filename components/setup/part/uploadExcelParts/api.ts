'use server'

import { db } from '@/sql'
import * as XLSX from 'xlsx'

export async function uploadClientData(file, prjId) {
  const allParts = await db('Part').select('name')

  const fileStream = file.stream()
  const chunks = [] as any[]
  for await (const chunk of fileStream) {
    chunks.push(chunk)
  }

  const rawBuffer = Buffer.concat(chunks)
  const workbook = XLSX.read(rawBuffer, { type: 'buffer' })
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  let headers = jsonData[0] as string[]
  headers = headers.map((header) => header.trim())
  console.log('headers', headers)

  const dataRows = jsonData.slice(1) as any[][]
  const mappedData = [] as any[]
  const mappedCancelData = [] as any[]

  function isPartExists(name) {
    let exist = allParts.find((p) => p.name === name.trim())
    if (exist) return true

    exist = mappedData.find((p) => p.name === name.trim())
    return !!exist
  }

  for (const row of dataRows) {
    if (row?.length) {
      const rowObject = {} as any
      let isOk = true
      headers.forEach(async (header, index) => {
        rowObject.prjId = prjId

        if (header === 'פרט') {
          const partName = row[index]
          if (!partName) return (isOk = false)

          const isExsits = isPartExists(partName)
          if (isExsits) isOk = false

          return (rowObject.name = partName.trim())
        }
        if (header === 'כמות') {
          if (!row[index]) return (rowObject.qntt = 0)
          return (rowObject.qntt = row[index])
        }
        if (header === 'תיאור') return (rowObject.desc = row[index])

        isOk = false
        // rowObject[header] = row[index]
      })
      isOk ? mappedData.push(rowObject) : mappedCancelData.push(rowObject)
    }
  }

  return { data: mappedData, wrongData: mappedCancelData }
}

export async function addClients(userId, clients) {
  const formatClients = clients.map((client) => {
    return {
      createdById: userId,
      ...client,
    }
  })

  const res = await db('clients').insert(formatClients).onConflict('idNum').ignore()

  return res
}

// export async function isPartExists(name) {
//   const res = await db('Part').where({ name }).first()
//   return !!res
// }
