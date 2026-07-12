import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    direction="right"
    {...props}
  />
)
Sheet.displayName = "Sheet"

const SheetTrigger = DrawerPrimitive.Trigger
const SheetPortal = DrawerPrimitive.Portal
const SheetClose = DrawerPrimitive.Close

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
    {...props}
  />
))
SheetOverlay.displayName = DrawerPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-[var(--nv-bg-elevated)] border-l border-[var(--nv-border)] shadow-2xl",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b",
        bottom: "inset-x-0 bottom-0 h-auto border-t",
        left: "inset-y-0 left-0 h-full w-full sm:w-96 border-r",
        right: "inset-y-0 right-0 h-full w-full sm:w-[420px] border-l",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-[var(--nv-text-secondary)] transition-colors hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)]">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DrawerPrimitive.Close>
    </DrawerPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DrawerPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 p-6 border-b border-[var(--nv-border)]",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col gap-3 p-6 border-t border-[var(--nv-border)] mt-auto",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-[var(--nv-text-primary)]",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = DrawerPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[var(--nv-text-tertiary)]", className)}
    {...props}
  />
))
SheetDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
