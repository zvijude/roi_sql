
-- Example to get qr data:
SELECT * FROM "Qr" where "qrNum"=453 and "prjId"=1
[
  {
    "id": 122,
    "qrNum": 453,
    "prjId": 1,
    "status": "WAITING_TASK",
    "floor": 15,
    "aptNum": 34,
    "front": "דרומית",
    "locInApt": "חדר הורים",
    "totalTasksCount": 5,
    "totalTasksCompleted": 3,
    "partId": 2,
    "createdById": 1,
    "createdAt": "2025-04-06 08:58:29.452",
    "updatedAt": "2025-04-06 08:58:29.452",
    "loc": "קומה 15, דירה 34, חדר הורים, חזית דרומית"
  }
]

-- Example to get all tasks of the QR by qrId:
SELECT * FROM "Task" where "qrId"=122
[
  {
    "id": 297,
    "status": null,
    "media": null,
    "qrId": 122,
    "mainTaskId": 793278,
    "kablanId": null,
    "note": null,
    "prjId": 1,
    "createdAt": "2025-04-06 08:58:29.556",
    "updatedAt": "2025-04-06 08:58:29.556",
    "createdById": null,
    "resById": null,
    "resAt": null
  },
  {
    "id": 293,
    "status": "COMPLETED",
    "media": [],
    "qrId": 122,
    "mainTaskId": 5956120,
    "kablanId": null,
    "note": null,
    "prjId": 1,
    "createdAt": "2025-04-06 08:58:29.556",
    "updatedAt": "2025-04-06 08:58:39.98",
    "createdById": 1,
    "resById": null,
    "resAt": null
  },
  {
    "id": 294,
    "status": "COMPLETED",
    "media": [],
    "qrId": 122,
    "mainTaskId": 23349,
    "kablanId": null,
    "note": null,
    "prjId": 1,
    "createdAt": "2025-04-06 08:58:29.556",
    "updatedAt": "2025-04-06 08:59:21.053",
    "createdById": 1,
    "resById": null,
    "resAt": null
  },
  {
    "id": 295,
    "status": "COMPLETED",
    "media": [
      "https://res.cloudinary.com/dfzjde8p7/image/upload/v1743929972/main/vheicdiktwxepu4kxnoy.png"
    ],
    "qrId": 122,
    "mainTaskId": 40360,
    "kablanId": null,
    "note": null,
    "prjId": 1,
    "createdAt": "2025-04-06 08:58:29.556",
    "updatedAt": "2025-04-06 08:59:35.775",
    "createdById": 1,
    "resById": null,
    "resAt": null
  },
  {
    "id": 296,
    "status": "WAITING",
    "media": [],
    "qrId": 122,
    "mainTaskId": 402173,
    "kablanId": null,
    "note": null,
    "prjId": 1,
    "createdAt": "2025-04-06 08:58:29.556",
    "updatedAt": "2025-04-06 08:59:38.987",
    "createdById": 1,
    "resById": null,
    "resAt": null
  }
]

-- Example of getting the data about the task, for each task in the qr:
SELECT * FROM "MainTask" where id=793278
[
  {
    "id": 793278,
    "title": "חמישית מחיר 500",
    "desc": "חמישית\nבלי מדיה\nעם אישור",
    "tasksId": 8400722,
    "prjId": 1,
    "order": 4,
    "for": "INSTALLER",
    "price": 500,
    "needApproval": true,
    "createdAt": "2025-03-10 12:07:46.02",
    "updatedAt": "2025-03-10 12:07:46.02",
    "needMedia": false
  }
]

-- Example of getting the events "Prob" of type "BGT_REQ" for the task:
SELECT * FROM "Prob" where "taskId"=296
[
  {
    "id": 25,
    "desc": "need  more money",
    "media": [
      "https://res.cloudinary.com/dfzjde8p7/image/upload/v1743930111/main/xqkpqfi4sg5xrr1jp2o9.png"
    ],
    "status": "WAITING",
    "kablanId": null,
    "createdById": 1,
    "resById": null,
    "resAt": null,
    "taskId": 296,
    "prjId": 1,
    "createdAt": "2025-04-06 09:01:54.13",
    "updatedAt": "2025-04-06 09:01:54.13",
    "price": 12000,
    "type": "BGT_REQ"
  }
]

-- Example of getting the events "Prob" of type "PROB" for the task:
SELECT * FROM "Prob" where "taskId"=294
[
  {
    "id": 24,
    "desc": "r4",
    "media": [
      "https://res.cloudinary.com/dfzjde8p7/image/upload/v1743929950/main/itgcghf83dxnqxzfllmn.png"
    ],
    "status": "CANCELED",
    "kablanId": null,
    "createdById": 1,
    "resById": 1,
    "resAt": "2025-04-06 08:59:16.404",
    "taskId": 294,
    "prjId": 1,
    "createdAt": "2025-04-06 08:59:12.96",
    "updatedAt": "2025-04-06 08:59:16.451",
    "price": 0,
    "type": "PROB"
  }
]

-- Example of getting the measurements "medidot" of the qr:
SELECT * FROM "medidot" where "qrId"=122
[
  {
    "id": 38,
    "qrId": 122,
    "partId": null,
    "prjId": 1,
    "isActive": true,
    "item": "זווית",
    "width": 12,
    "height": 12,
    "depth": 12,
    "media": "",
    "note": "12defrsw12",
    "floor": 15,
    "aptNum": "34",
    "front": "דרומית",
    "locInApt": "חדר הורים",
    "loc": "קומה 15, דירה 34, חדר הורים, חזית דרומית",
    "createdAt": "2025-04-06 09:22:46.010797",
    "createdById": 1,
    "updatedAt": "2025-04-06 09:22:46.010797",
    "resAt": null,
    "updatedById": null
  }
]

-- Example of getting the missing items of the qr:
SELECT * FROM missing WHERE "qrId"=122
[
  {
    "id": 91,
    "qrId": 122,
    "partId": null,
    "prjId": 1,
    "item": "בורג 6",
    "qntt": 23,
    "isActive": true,
    "media": "",
    "note": "erferf23verf 3f23 234",
    "floor": 15,
    "aptNum": "34",
    "front": "דרומית",
    "locInApt": "חדר הורים",
    "loc": "קומה 15, דירה 34, חדר הורים, חזית דרומית",
    "createdAt": "2025-04-06 09:24:35.322875",
    "createdById": 1,
    "resAt": null,
    "updatedAt": "2025-04-06 09:24:35.322875",
    "updatedById": null
  }
]

-- Example of getting the part of the qr:
SELECT * FROM "Part" where id=2
[
  {
    "id": 2,
    "name": "A-2",
    "desc": "description",
    "qntt": 30,
    "prjId": 1,
    "tasksId": 8400722,
    "createdAt": "2025-03-10 11:46:10.871",
    "updatedAt": "2025-03-10 13:46:09.968"
  }
]

