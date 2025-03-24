import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon, { IconNames } from 'zvijude/icon'

export function FileBtn({
  clr = 'solid',
  lbl,
  icon,
  className = '',
  iconCls = '',
  flipIcon = false,
  size = 'medium',
  children,
  ...props
}: BtnProps) {
  const sizeCls = sizeMap[size]
  const varCls = clsMap[clr]
  const cls = twMerge(
    sizeCls.cls,
    'flex min-w-fit justify-center bg-white font-semibold rounded-md shadow hover:shadow-lg active:shadow-none transition-shadow disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    varCls.cls,
    className
  )

  let tagType = 'button' as any
  if (children) tagType = 'label'
  if (props.href) tagType = Link
  const Tag = tagType as ElementType

  return (
    <Tag className={cls} {...props}>
      {icon && (
        <Icon
          name={icon}
          type={clr === 'text' || clr === 'icon' ? 'reg' : 'sol'}
          className={`${varCls.iconCls} ${iconCls} ${sizeCls.iconCls}`}
          flip={flipIcon}
        />
      )}
      {children && children}
      {lbl && <p>{lbl}</p>}
    </Tag>
  )
}

const clsMap = {
  solid: { cls: 'bg-solid text-white hover:bg-solid/95 transition-all', iconCls: 'bg-white' },
  soft: { cls: 'bg-soft text-solid', iconCls: 'bg-solid' },
  icon: { cls: 'size-10 p-0 border', iconCls: '' },
  text: { cls: 'border text-black', iconCls: '' },
}

const sizeMap = {
  small: { cls: 'h-9 px-3 gap-3 text-sm', iconCls: 'size-3' },
  medium: { cls: 'h-10 px-4', iconCls: 'size-4' },
  large: { cls: 'h-11 px-5 gap-5 text-lg', iconCls: 'size-5' },
}

export type BtnProps = {
  icon?: IconNames
  clr?: 'solid' | 'soft' | 'text' | 'icon'
  lbl?: string
  size?: 'small' | 'medium' | 'large'
  iconCls?: HTMLDivElement['className']
  flipIcon?: boolean
} & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }) // Button-specific props
  | (Partial<LinkProps> & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
) // Link-specific props

export function SimpleBtn({ lbl, href, className, ...props }: SimpleBtnProps) {
  const defaultCls =
    'hover:bg-solid leading-tight active:opacity-95 hover:text-white transition-colors duration-75 ps-3 pe-4 py-[5px] rounded-md block w-full text-start disabled:pointer-events-none disabled:opacity-50'

  if (href)
    return (
      <Link href={href} className={twMerge(defaultCls, className)}>
        {lbl}
      </Link>
    )
  return (
    <button className={twMerge(defaultCls, className)} {...props}>
      {lbl}
    </button>
  )
}

type SimpleBtnProps = {
  lbl: string
  onClick?: () => void
  href?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<LinkProps>
