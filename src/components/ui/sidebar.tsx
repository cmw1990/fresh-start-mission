import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"

const sidebarVariants = cva("relative h-full flex-col", {
  variants: {
    variant: {
      default: "",
      inset: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
  trigger?: React.ReactNode
  state?: boolean
  onStateChange?: (state: boolean) => void
  children?: React.ReactNode
}

export interface SidebarContentProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarSectionProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarHeaderProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarFooterProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarNavProps extends React.ComponentPropsWithoutRef<"nav"> {}

export interface SidebarNavItemProps
  extends React.ComponentPropsWithoutRef<"a"> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      variant,
      size,
      className,
      trigger,
      state,
      onStateChange,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile } = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false)

    const [internalOpen, setInternalOpen] = React.useState(true)

    const isControlled = state !== undefined && !!onStateChange
    const open = isControlled ? state : internalOpen

    const handleToggle = React.useCallback(() => {
      if (isControlled) {
        onStateChange?.(!state)
      } else {
        setInternalOpen((prev) => !prev)
      }
    }, [isControlled, onStateChange, state])

    const handleTriggerClick = React.useCallback(() => {
      handleToggle()
    }, [handleToggle])

    const toggleOpenMobile = React.useCallback(() => {
      setOpenMobile((prev) => !prev)
    }, [])

    return (
      <>
        <nav
          className={cn(
            "peer fixed inset-0 z-40 hidden",
            isMobile && openMobile && "block"
          )}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
            <div
              className={cn(
                "flex h-full w-[280px] flex-col border-r bg-background",
                variant === "inset" &&
                  "h-[calc(100vh-16px)] w-[calc(256px-8px)] rounded-l-xl border-l py-2 pl-2",
                variant === "inset" && "my-2",
                className
              )}
            >
              <div className="flex items-center p-2">
                <div className="flex-1">
                  {trigger || <h2 className="text-xl font-medium">Menu</h2>}
                </div>
                <Button variant="outline" size="icon" onClick={toggleOpenMobile}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-2">{children}</div>
            </div>
          </div>
        </nav>
        <aside
          ref={ref}
          data-variant={variant}
          data-size={size}
          data-state={open ? "open" : "closed"}
          className={cn(
            sidebarVariants({ variant, size }),
            "flex h-screen w-fit overflow-hidden border-r border-black/[0.08] bg-white dark:border-white/[0.05] dark:bg-gray-950",
            "gap-0 duration-300 ease-in-out",
            "[--sidebar-width:270px] data-[state=open]:w-[var(--sidebar-width)] data-[state=closed]:w-[var(--sidebar-closed-width)]",
            "[--sidebar-closed-width:theme(spacing.14)]",
            "data-[size=sm]:[--sidebar-width:240px] data-[size=sm]:[--sidebar-closed-width:theme(spacing.12)]",
            "data-[size=lg]:[--sidebar-width:300px] data-[size=lg]:[--sidebar-closed-width:theme(spacing.16)]",
            isMobile && "hidden",
            className
          )}
          {...props}
        >
          {children}
        </aside>
        {isMobile ? (
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "fixed bottom-4 left-4 z-40 h-9 w-9 shrink-0 rounded-full shadow-md",
              isMobile && !openMobile ? "flex" : "hidden"
            )}
            onClick={toggleOpenMobile}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-[--sidebar-toggle-offset] top-7 z-40 h-6 w-6 shrink-0 rounded-full shadow-sm",
              "data-[state=open]:translate-x-1 data-[state=closed]:-translate-x-10",
              "duration-200 ease-out hover:duration-100",
              "[--sidebar-toggle-offset:calc(0px)]",
              "data-[state=open]:hover:bg-secondary data-[state=closed]:hover:bg-secondary",
              open &&
                "right-0 translate-x-[50%] data-[state=open]:translate-x-[50%]"
            )}
            onClick={handleTriggerClick}
          >
            {!open && <ChevronRight className="h-3 w-3" />}
            {open && <ChevronLeft className="h-3 w-3" />}
          </Button>
        )}
      </>
    )
  }
)

Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      className={cn(
        "data-[state=closed]:w-8 data-[state=open]:w-full",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
})

SidebarTrigger.displayName = "SidebarTrigger"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  SidebarContentProps & { showScrollbar?: boolean }
>(({ className, showScrollbar = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full flex-1 flex-col overflow-auto",
        showScrollbar ? "pr-1" : "scrollbar-none",
        className
      )}
      {...props}
    />
  )
})

SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between py-2 px-3", className)}
        {...props}
      />
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between py-2 px-3", className)}
        {...props}
      />
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = React.forwardRef<HTMLNavElement, SidebarNavProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex flex-col space-y-1 px-2 py-4", className)}
        {...props}
      />
    )
  }
)

SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "group flex w-full items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline",
          className
        )}
        {...props}
      />
    )
  }
)

SidebarNavItem.displayName = "SidebarNavItem"

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mt-6 px-2", className)} {...props}>
        <div className="mb-2 text-sm font-semibold">
          {props.children}
        </div>
      </div>
    )
  }
)

SidebarSection.displayName = "SidebarSection"

export {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarSection,
}
