import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarRadioGroup, MenubarRadioItem, MenubarCheckboxItem } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, NavigationMenuIndicator } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup } from "@/components/ui/context-menu"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table"
import { Toggle, toggleVariants } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Terminal, CreditCard, User, Settings, Keyboard, LogOut, Plus, Cloud, Github, LifeBuoy, Mail, MessageSquare, PlusCircle, UserPlus, Users, ChevronRight, Share, MoreVertical, Bold, Italic, Underline } from "lucide-react"
import {
  BarVisualizerDemo,
  ConversationDemo,
  LiveWaveformDemo,
  MessageDemo,
  MicSelectorDemo,
  OrbDemo,
  ResponseDemo,
  ShimmeringTextDemo,
  SpeechInputDemo,
  TranscriptViewerDemo,
  VoiceButtonDemo,
  VoicePickerDemo,
  WaveformDemo,
} from "@/components/elevenlabs-demos"

export type ComponentCategory =
  | "Forms"
  | "Overlay"
  | "Data display"
  | "Layout"
  | "Feedback"
  | "Navigation"
  | "Voice"

export const registry: Record<string, {
  name: string;
  description: string;
  category: ComponentCategory;
  component: React.ReactNode;
  code: string;
  cliInstallCommand?: string;
  examples?: { title: string; component: React.ReactNode; code: string }[];
}> = {
  button: {
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    category: "Data display",
    component: (
      <div className="flex flex-wrap gap-4">
        <Button>Default Glow</Button>
        <Button variant="secondary">Secondary Glass</Button>
        <Button variant="outline">Cyber Outline</Button>
        <Button variant="ghost">Ghost Neon</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button>Default Glow</Button>
      <Button variant="secondary">Secondary Glass</Button>
      <Button variant="outline">Cyber Outline</Button>
      <Button variant="ghost">Ghost Neon</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
`,
    examples: [
      {
        title: "Sizes",
        component: (
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        ),
        code: `import { Button } from "@/components/ui/button"
import { Share } from "lucide-react"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Share className="h-4 w-4" />
      </Button>
    </div>
  )
}
`,
      },
      {
        title: "With icon",
        component: (
          <div className="flex flex-wrap gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Login with Email
            </Button>
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        ),
        code: `import { Button } from "@/components/ui/button"
import { Mail, Github } from "lucide-react"

export function ButtonWithIcon() {
  return (
    <div className="flex gap-4">
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </Button>
      <Button variant="outline">
        <Github className="mr-2 h-4 w-4" />
        View on GitHub
      </Button>
    </div>
  )
}
`,
      },
    ],
  },
  card: {
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    category: "Data display",
    component: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-primary">Futuristic Card</CardTitle>
          <CardDescription>Glassmorphism with subtle border glows.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
            <p className="text-xs text-muted-foreground">System integrity at 67%</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">Abort</Button>
          <Button size="sm">Synchronize</Button>
        </CardFooter>
      </Card>
    ),
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-primary">Futuristic Card</CardTitle>
        <CardDescription>Glassmorphism with subtle border glows.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>System integrity is stable. All modules are operational.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Deploy</Button>
      </CardFooter>
    </Card>
  )
}
`,
    examples: [
      {
        title: "With form",
        component: (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>Enter your details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit</Button>
            </CardFooter>
          </Card>
        ),
        code: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter your details below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  )
}
`,
      },
    ],
  },
  "dropdown-menu": {
    name: "Dropdown Menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    category: "Navigation",
    component: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Access System</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut } from "lucide-react"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Access System</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`,
  },
  accordion: {
    name: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal an associated section of content.",
    category: "Data display",
    component: (
      <Accordion type="single" collapsible className="w-[450px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Cyber Security Protocol?</AccordionTrigger>
          <AccordionContent>
            Our systems use quantum-encrypted protocols for maximum security and data integrity across all nodes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Neural Link Status</AccordionTrigger>
          <AccordionContent>
            The neural interface is currently operating at 98.4% efficiency with minimal latency detected in the upper layers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
`,
  },
  alert: {
    name: "Alert",
    category: "Feedback",
    description: "Displays a callout for user attention.",
    component: (
      <div className="flex flex-col gap-4 w-[450px]">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>System Notification</AlertTitle>
          <AlertDescription>
            A new firmware update is available for your neural link.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Security Breach</AlertTitle>
          <AlertDescription>
            Unauthorized access attempt detected in Sector 7G.
          </AlertDescription>
        </Alert>
      </div>
    ),
    code: `import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}
`,
  },
  "alert-dialog": {
    name: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    category: "Overlay",
    component: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Initiate Self-Destruct</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your core memories and remove your data from the mainframe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abort Mission</AlertDialogCancel>
            <AlertDialogAction>Proceed with Destruction</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
`,
  },
  badge: {
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    category: "Data display",
    component: (
      <div className="flex gap-2">
        <Badge>Active</Badge>
        <Badge variant="secondary">Standby</Badge>
        <Badge variant="destructive">Critial</Badge>
        <Badge variant="outline">Debug</Badge>
        <Badge variant="neon">Ultra</Badge>
      </div>
    ),
    code: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Active</Badge>
      <Badge variant="secondary">Standby</Badge>
      <Badge variant="destructive">Critical</Badge>
      <Badge variant="outline">Debug</Badge>
      <Badge variant="neon">Ultra</Badge>
    </div>
  )
}
`,
  },
  avatar: {
    name: "Avatar",
    description: "An image element with a fallback for representing the user.",
    category: "Data display",
    component: (
      <div className="flex gap-4 items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww" alt="JD" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12 border-primary/50 shadow-[0_0_15px_var(--glow-primary)]">
          <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
`,
  },
  skeleton: {
    name: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    category: "Feedback",
    component: (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ),
    code: `import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
`,
  },
  checkbox: {
    name: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "Forms",
    component: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept futuristic terms and conditions</Label>
      </div>
    ),
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
`,
  },
  input: {
    name: "Input",
    description: "Displays a form input field or a component that looks like an input field.",
    category: "Forms",
    component: (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Neural ID</Label>
        <Input type="email" id="email" placeholder="Enter identification code..." />
      </div>
    ),
    code: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
`,
    examples: [
      {
        title: "Disabled",
        component: (
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input disabled placeholder="Disabled" />
          </div>
        ),
        code: `import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return <Input disabled placeholder="Disabled" />
}
`,
      },
      {
        title: "With button",
        component: (
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input placeholder="Search..." />
            <Button type="submit">Search</Button>
          </div>
        ),
        code: `import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input placeholder="Search..." />
      <Button type="submit">Search</Button>
    </div>
  )
}
`,
      },
    ],
  },
  select: {
    name: "Select",
    category: "Forms",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    component: (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Sector Alpha</SelectItem>
          <SelectItem value="dark">Sector Beta</SelectItem>
          <SelectItem value="system">Sector Gamma</SelectItem>
        </SelectContent>
      </Select>
    ),
    code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}
`,
  },
  slider: {
    name: "Slider",
    category: "Forms",
    description: "An input where the user selects a value from a given range.",
    component: (
      <div className="w-[300px]">
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    ),
    code: `import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return <Slider defaultValue={[33]} max={100} step={1} />
}
`,
  },
  switch: {
    name: "Switch",
    category: "Forms",
    description: "A control that allows the user to toggle between checked and not checked.",
    component: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Stealth Mode</Label>
      </div>
    ),
    code: `import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
`,
  },
  textarea: {
    name: "Textarea",
    category: "Forms",
    description: "Displays a form textarea field or a component that looks like a textarea field.",
    component: (
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Transmission Data</Label>
        <Textarea placeholder="Enter your message to the colony..." id="message" />
      </div>
    ),
    code: `import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}
`,
  },
  "radio-group": {
    name: "Radio Group",
    category: "Forms",
    description: "A set of checkable buttons—known as radio buttons—where no more than one button can be checked at a time.",
    component: (
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Priority Alpha</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Priority Omega</Label>
        </div>
      </RadioGroup>
    ),
    code: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
`,
  },
  breadcrumb: {
    name: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    category: "Navigation",
    component: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Mainframe</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/nodes">Nodes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Core Processor</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
`,
  },
  menubar: {
    name: "Menubar",
    description: "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.",
    category: "Navigation",
    component: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>System</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Protocol <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Encryption</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share Node</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Terminate</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo Process</MenubarItem>
            <MenubarItem>Redo Process</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
`,
  },
  "navigation-menu": {
    name: "Navigation Menu",
    description: "A collection of links for navigating websites and apps.",
    category: "Navigation",
    component: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Protocols</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="px-4 py-2 hover:text-primary transition-colors cursor-pointer">Mainframe</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    code: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
`,
  },
  pagination: {
    name: "Pagination",
    description: "Pagination with previous and next buttons.",
    category: "Data display",
    component: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    code: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
`,
  },
  dialog: {
    name: "Dialog",
    description: "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
    category: "Overlay",
    component: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Execute Override</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Critical System Override</DialogTitle>
            <DialogDescription>
              Are you sure you want to bypass the neural safety protocols? This may cause severe feedback loops.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Execute</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
`,
  },
  popover: {
    name: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    category: "Overlay",
    component: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Node Specs</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-primary">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the neural node.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
    code: `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p>Rich content here.</p>
      </PopoverContent>
    </Popover>
  )
}
`,
  },
  progress: {
    name: "Progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    category: "Feedback",
    component: (
      <div className="w-[350px]">
        <Progress value={67} />
      </div>
    ),
    code: `import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={67} className="w-[60%]" />
}
`,
  },
  sheet: {
    name: "Sheet",
    description: "An extended version of a dialog component that is used to display content that is not as critical to the task flow, or to provide more options or data for the user.",
    category: "Overlay",
    component: (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Data Stream</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Encryption Protocol v12.4</SheetTitle>
            <SheetDescription>
              Monitor outgoing data packets through the encrypted tunnel.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="h-40 w-full bg-muted rounded-md border border-border animate-pulse" />
          </div>
          <SheetFooter>
            <Button type="submit">Abort</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
`,
  },
  tooltip: {
    name: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    category: "Overlay",
    component: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Neural Node</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
`,
  },
  "hover-card": {
    name: "Hover Card",
    description: "For sighted users to preview content available behind a link.",
    category: "Overlay",
    component: (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="text-primary hover:text-primary/80">@mainframe</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarFallback className="bg-primary/20 text-primary">MF</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-primary">Mainframe Core</h4>
              <p className="text-sm text-muted-foreground">
                Central processing unit for the colonial network.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
    code: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}
`,
  },
  "context-menu": {
    name: "Context Menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.",
    category: "Overlay",
    component: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-border bg-muted/50 text-sm">
          Right click for Node Controls
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>Save Page As...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    ),
    code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
`,
  },
  calendar: {
    name: "Calendar",
    description: "A date picker component that allows users to select a date from a calendar.",
    category: "Data display",
    component: (
      <div className="rounded-md border border-border bg-muted/50 p-3">
        <Calendar mode="single" className="rounded-md border-0" />
      </div>
    ),
    code: `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  )
}
`,
  },
  table: {
    name: "Table",
    description: "A responsive table component.",
    category: "Data display",
    component: (
      <Table>
        <TableCaption>A list of recent neural transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Node</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead className="text-right">Bandwidth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>TCP/IP</TableCell>
            <TableCell className="text-right">250 GB</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    code: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
`,
  },
  command: {
    name: "Command",
    description: "A fast, composable, unstyled command menu for React.",
    category: "Data display",
    component: (
      <Command className="rounded-lg border border-border shadow-md bg-popover max-w-[450px]">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Neural Calendar</span>
            </CommandItem>
            <CommandItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Broadcast Status</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
    code: `import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
`,
  },
  "input-otp": {
    name: "Input OTP",
    description: "A specialized input for one-time passwords.",
    category: "Forms",
    component: (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
    code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
`,
  },
  resizable: {
    name: "Resizable",
    description: "Accessible resizable panel groups and handles with keyboard support.",
    category: "Layout",
    component: (
      <ResizablePanelGroup
        orientation="horizontal"
        className="max-w-md rounded-lg border border-border bg-muted/50"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold text-primary">Node A</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold text-primary">Node B</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
    code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
`,
  },
  toggle: {
    name: "Toggle",
    description: "A two-state button that can be either on or off.",
    category: "Data display",
    component: (
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    ),
    code: `import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
`,
  },
  "toggle-group": {
    name: "Toggle Group",
    description: "A set of two-state buttons that can be toggled on or off.",
    category: "Data display",
    component: (
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    code: `import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
`,
  },
  "bar-visualizer": {
    name: "Bar Visualizer",
    description: "Animated frequency bars for voice assistant states (listening, speaking, etc.).",
    category: "Voice",
    component: <BarVisualizerDemo />,
    code: `"use client"

import { useState } from "react"
import {
  BarVisualizer,
  type AgentState,
} from "@/components/ui/bar-visualizer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function BarVisualizerDemo() {
  const [state, setState] = useState<AgentState>("listening")

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Audio Frequency Visualizer</CardTitle>
        <CardDescription>
          Real-time frequency band visualization with animated state transitions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <BarVisualizer
            state={state}
            demo={true}
            barCount={20}
            minHeight={15}
            maxHeight={90}
            className="h-40 max-w-full"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={state === "connecting" ? "default" : "outline"}
              onClick={() => setState("connecting")}
            >
              Connecting
            </Button>
            <Button
              size="sm"
              variant={state === "initializing" ? "default" : "outline"}
              onClick={() => setState("initializing")}
            >
              Initializing
            </Button>
            <Button
              size="sm"
              variant={state === "listening" ? "default" : "outline"}
              onClick={() => setState("listening")}
            >
              Listening
            </Button>
            <Button
              size="sm"
              variant={state === "speaking" ? "default" : "outline"}
              onClick={() => setState("speaking")}
            >
              Speaking
            </Button>
            <Button
              size="sm"
              variant={state === "thinking" ? "default" : "outline"}
              onClick={() => setState("thinking")}
            >
              Thinking
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/bar-visualizer",
  },
  conversation: {
    name: "Conversation",
    description: "Scrollable conversation container with stick-to-bottom and empty state.",
    category: "Voice",
    component: <ConversationDemo />,
    code: `"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/conversation"
import { Message, MessageContent } from "@/components/ui/message"
import { Orb } from "@/components/ui/orb"
import { Response } from "@/components/ui/response"

const allMessages = [
  { id: "1", role: "user", parts: [{ type: "text", text: "Hey, I need help with my order" }] },
  {
    id: "2",
    role: "assistant",
    parts: [{
      type: "text",
      tokens: ["Hi!", " I'd", " be", " happy", " to", " help", " you", " with", " your", " order.", " Could", " you", " please", " provide", " your", " order", " number?"],
      text: "Hi! I'd be happy to help you with your order. Could you please provide your order number?",
    }],
  },
  { id: "3", role: "user", parts: [{ type: "text", text: "It's ORDER-12345" }] },
  {
    id: "4",
    role: "assistant",
    parts: [{
      type: "text",
      tokens: ["Thank", " you!", " Let", " me", " pull", " up", " your", " order", " details.", " I", " can", " see", " that", " your", " order", " was", " placed", " on", " March", " 15th", " and", " is", " currently", " being", " processed.", " It", " should", " ship", " within", " the", " next", " 1-2", " business", " days.", " Is", " there", " anything", " specific", " you'd", " like", " to", " know", " about", " this", " order?"],
      text: "Thank you! Let me pull up your order details. I can see that your order was placed on March 15th and is currently being processed. It should ship within the next 1-2 business days. Is there anything specific you'd like to know about this order?",
    }],
  },
  { id: "5", role: "user", parts: [{ type: "text", text: "Can I change the shipping address?" }] },
  {
    id: "6",
    role: "assistant",
    parts: [{
      type: "text",
      tokens: ["Absolutely!", " Since", " the", " order", " hasn't", " shipped", " yet,", " I", " can", " update", " the", " shipping", " address", " for", " you.", " What", " would", " you", " like", " the", " new", " address", " to", " be?"],
      text: "Absolutely! Since the order hasn't shipped yet, I can update the shipping address for you. What would you like the new address to be?",
    }],
  },
]

const ConversationDemo = () => {
  const [messages, setMessages] = useState<typeof allMessages>([])
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null)
  const [streamingContent, setStreamingContent] = useState("")

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    const intervals: NodeJS.Timeout[] = []
    let currentMessageIndex = 0

    const addNextMessage = () => {
      if (currentMessageIndex >= allMessages.length) return
      const message = allMessages[currentMessageIndex]
      const part = message.parts[0]
      if (message.role === "assistant" && "tokens" in part && part.tokens) {
        setStreamingMessageIndex(currentMessageIndex)
        setStreamingContent("")
        let currentContent = ""
        let tokenIndex = 0
        const streamInterval = setInterval(() => {
          if (tokenIndex < part.tokens.length) {
            currentContent += part.tokens[tokenIndex]
            setStreamingContent(currentContent)
            tokenIndex++
          } else {
            clearInterval(streamInterval)
            setMessages((prev) => [...prev, message])
            setStreamingMessageIndex(null)
            setStreamingContent("")
            currentMessageIndex++
            timeouts.push(setTimeout(addNextMessage, 500))
          }
        }, 100)
        intervals.push(streamInterval)
      } else {
        setMessages((prev) => [...prev, message])
        currentMessageIndex++
        timeouts.push(setTimeout(addNextMessage, 800))
      }
    }
    timeouts.push(setTimeout(addNextMessage, 1000))
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [])

  return (
    <Card className="relative mx-auto my-0 size-full h-[400px] py-0">
      <div className="flex h-full flex-col">
        <Conversation>
          <ConversationContent>
            {messages.length === 0 && streamingMessageIndex === null ? (
              <ConversationEmptyState
                icon={<Orb className="size-12" />}
                title="Start a conversation"
                description="This is a simulated conversation"
              />
            ) : (
              <>
                {messages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return <Response key={\`\${message.id}-\${i}\`}>{part.text}</Response>
                          default:
                            return null
                        }
                      })}
                    </MessageContent>
                    {message.role === "assistant" && (
                      <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                        <Orb className="h-full w-full" agentState={null} />
                      </div>
                    )}
                  </Message>
                ))}
                {streamingMessageIndex !== null && (
                  <Message from={allMessages[streamingMessageIndex].role} key={\`streaming-\${streamingMessageIndex}\`}>
                    <MessageContent>
                      <Response>{streamingContent || "\\u200B"}</Response>
                    </MessageContent>
                    {allMessages[streamingMessageIndex].role === "assistant" && (
                      <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                        <Orb className="h-full w-full" agentState="talking" />
                      </div>
                    )}
                  </Message>
                )}
              </>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
    </Card>
  )
}

export { ConversationDemo }
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/conversation",
  },
  "live-waveform": {
    name: "Live Waveform",
    description: "Real-time waveform visualization from microphone or audio stream.",
    category: "Voice",
    component: <LiveWaveformDemo />,
    code: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LiveWaveform } from "@/components/ui/live-waveform"

export function LiveWaveformDemo() {
  const [active, setActive] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [mode, setMode] = useState<"static" | "scrolling">("static")

  const handleToggleActive = () => {
    setActive(!active)
    if (!active) {
      setProcessing(false)
    }
  }

  const handleToggleProcessing = () => {
    setProcessing(!processing)
    if (!processing) {
      setActive(false)
    }
  }

  return (
    <div className="bg-card w-full rounded-lg border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Live Audio Waveform</h3>
        <p className="text-muted-foreground text-sm">
          Real-time microphone input visualization with audio reactivity
        </p>
      </div>

      <div className="space-y-4">
        <LiveWaveform
          active={active}
          processing={processing}
          height={80}
          barWidth={3}
          barGap={2}
          mode={mode}
          fadeEdges={true}
          barColor="gray"
          historySize={120}
        />

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            size="sm"
            variant={active ? "default" : "outline"}
            onClick={handleToggleActive}
          >
            {active ? "Stop" : "Start"} Listening
          </Button>
          <Button
            size="sm"
            variant={processing ? "default" : "outline"}
            onClick={handleToggleProcessing}
          >
            {processing ? "Stop" : "Start"} Processing
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMode(mode === "static" ? "scrolling" : "static")}
          >
            Mode: {mode === "static" ? "Static" : "Scrolling"}
          </Button>
        </div>
      </div>
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/live-waveform",
  },
  message: {
    name: "Message",
    description: "Chat message bubble with user/assistant variants and avatar.",
    category: "Voice",
    component: <MessageDemo />,
    code: `"use client"

import { useEffect, useState } from "react"
import { Message, MessageContent } from "@/components/ui/message"
import { Orb } from "@/components/ui/orb"
import { Response } from "@/components/ui/response"

const assistantMessageTokens = [
  "To", " create", " a", " new", " agent", " with", " **", "ElevenLabs", " Agents", "**", ",",
  " head", " to", " this", " link", ":", " ", "[", "https://elevenlabs.io/app/agents", "](",
  "https://elevenlabs.io/app/agents", ")", ".", "\\n\\n", "1.", " Sign", " in", " to", " your",
  " ElevenLabs", " account", ".", "\\n", "2.", " Click", " **New", " Agent**", " to", " start", ".",
  "\\n", "3.", " Give", " your", " agent", " a", " name", " and", " description", ".", "\\n", "4.",
  " Configure", " its", " behavior", ",", " knowledge", " sources", ",", " and", " voice", ".",
  "\\n", "5.", " Save", " it", " —", " and", " your", " agent", " is", " ready", " to", " use", ".",
]

const MessageDemo = () => {
  const [content, setContent] = useState("\\u200B")
  const [isStreaming, setIsStreaming] = useState(false)

  useEffect(() => {
    let currentContent = ""
    let index = 0
    const startTimeout = setTimeout(() => setIsStreaming(true), 500)
    const interval = setInterval(() => {
      if (index < assistantMessageTokens.length) {
        currentContent += assistantMessageTokens[index]
        setContent(currentContent)
        index++
      } else {
        clearInterval(interval)
        setIsStreaming(false)
      }
    }, 100)
    return () => {
      clearInterval(interval)
      clearTimeout(startTimeout)
    }
  }, [])

  return (
    <>
      <style>{\`
        .message-demo-lists ol,
        .message-demo-lists ul {
          padding-left: 1.25rem !important;
        }
        .message-demo-lists li {
          margin-left: 0 !important;
        }
      \`}</style>
      <div className="flex h-full max-h-[400px] w-full max-w-2xl flex-col overflow-hidden">
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4">
          <div className="flex-shrink-0">
            <Message from="user">
              <MessageContent>
                <Response>How do I create an agent?</Response>
              </MessageContent>
            </Message>
          </div>
          <div className="message-demo-lists flex-shrink-0">
            <Message from="assistant">
              <MessageContent>
                <Response>{content}</Response>
              </MessageContent>
              <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                <Orb className="h-full w-full" agentState={isStreaming ? "talking" : null} />
              </div>
            </Message>
          </div>
        </div>
      </div>
    </>
  )
}

export { MessageDemo }
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/message",
  },
  "mic-selector": {
    name: "Mic Selector",
    description: "Dropdown to select microphone device with mute and live waveform.",
    category: "Voice",
    component: <MicSelectorDemo />,
    code: `"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Disc, Pause, Play, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LiveWaveform } from "@/components/ui/live-waveform"
import { MicSelector } from "@/components/ui/mic-selector"
import { Separator } from "@/components/ui/separator"

type RecordingState = "idle" | "loading" | "recording" | "recorded" | "playing"

export function MicSelectorDemo() {
  const [selectedDevice, setSelectedDevice] = useState<string>("")
  const [isMuted, setIsMuted] = useState(false)
  const [state, setState] = useState<RecordingState>("idle")
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioElementRef = useRef<HTMLAudioElement | null>(null)

  const startRecording = useCallback(async () => {
    try {
      setState("loading")
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true,
      })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
        setState("recorded")
      }
      mediaRecorder.start()
      setState("recording")
    } catch (error) {
      console.error("Error starting recording:", error)
      setState("idle")
    }
  }, [selectedDevice])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === "recording") {
      mediaRecorderRef.current.stop()
    }
  }, [state])

  const playRecording = useCallback(() => {
    if (!audioBlob) return
    const audio = new Audio(URL.createObjectURL(audioBlob))
    audioElementRef.current = audio
    audio.onended = () => setState("recorded")
    audio.play()
    setState("playing")
  }, [audioBlob])

  const pausePlayback = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      setState("recorded")
    }
  }, [])

  const restart = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      audioElementRef.current = null
    }
    setAudioBlob(null)
    audioChunksRef.current = []
    setState("idle")
  }, [])

  useEffect(() => {
    if (isMuted && state === "recording") stopRecording()
  }, [isMuted, state, stopRecording])

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop()
      if (audioElementRef.current) audioElementRef.current.pause()
    }
  }, [])

  const showWaveform = state === "recording" && !isMuted
  const showProcessing = state === "loading" || state === "playing"
  const showRecorded = state === "recorded"

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center p-4">
      <Card className="m-0 w-full max-w-2xl border p-0 shadow-lg">
        <div className="flex w-full flex-wrap items-center justify-between gap-2 p-2">
          <div className="h-8 w-full min-w-0 flex-1 md:w-[200px] md:flex-none">
            <div className={cn("flex h-full items-center gap-2 rounded-md py-1", "bg-foreground/5 text-foreground/70")}>
              <div className="h-full min-w-0 flex-1">
                <div className="relative flex h-full w-full shrink-0 items-center justify-center overflow-hidden rounded-sm">
                  <LiveWaveform
                    key={state}
                    active={showWaveform}
                    processing={showProcessing}
                    deviceId={selectedDevice}
                    barWidth={3}
                    barGap={1}
                    barRadius={4}
                    fadeEdges={true}
                    fadeWidth={24}
                    sensitivity={1.8}
                    smoothingTimeConstant={0.85}
                    height={20}
                    mode="scrolling"
                    className={cn("h-full w-full transition-opacity duration-300", state === "idle" && "opacity-0")}
                  />
                  {state === "idle" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-foreground/50 text-xs font-medium">Start Recording</span>
                    </div>
                  )}
                  {showRecorded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-foreground/50 text-xs font-medium">Ready to Play</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-1 md:w-auto">
            <MicSelector
              value={selectedDevice}
              onValueChange={setSelectedDevice}
              muted={isMuted}
              onMutedChange={setIsMuted}
              disabled={state === "recording" || state === "loading"}
            />
            <Separator orientation="vertical" className="mx-1 -my-2.5" />
            <div className="flex">
              {state === "idle" && (
                <Button variant="ghost" size="icon" onClick={startRecording} disabled={isMuted} aria-label="Start recording">
                  <Disc className="size-5" />
                </Button>
              )}
              {(state === "loading" || state === "recording") && (
                <Button variant="ghost" size="icon" onClick={stopRecording} disabled={state === "loading"} aria-label="Stop recording">
                  <Pause className="size-5" />
                </Button>
              )}
              {showRecorded && (
                <Button variant="ghost" size="icon" onClick={playRecording} aria-label="Play recording">
                  <Play className="size-5" />
                </Button>
              )}
              {state === "playing" && (
                <Button variant="ghost" size="icon" onClick={pausePlayback} aria-label="Pause playback">
                  <Pause className="size-5" />
                </Button>
              )}
              <Separator orientation="vertical" className="mx-1 -my-2.5" />
              <Button
                variant="ghost"
                size="icon"
                onClick={restart}
                disabled={state === "idle" || state === "loading" || state === "recording"}
                aria-label="Delete recording"
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/mic-selector",
  },
  orb: {
    name: "Orb",
    description: "3D orb visualization that reacts to agent state and volume.",
    category: "Voice",
    component: <OrbDemo />,
    code: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AgentState, Orb } from "@/components/ui/orb"

let ORBS: [string, string][] = [
  ["#CADCFC", "#A0B9D1"],
  ["#F6E7D8", "#E0CFC2"],
  ["#E5E7EB", "#9CA3AF"],
]

export function OrbDemo({ small = false }: { small?: boolean }) {
  const [agent, setAgent] = useState<AgentState>(null)

  ORBS = small ? [ORBS[0]] : ORBS

  return (
    <div className="bg-card w-full rounded-lg border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Agent Orbs</h3>
        <p className="text-muted-foreground text-sm">
          Interactive orb visualization with agent states
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-8">
          {ORBS.map((colors, index) => (
            <div
              key={index}
              className={\`relative \${index === 1 ? "block md:block" : "hidden md:block"}\`}
            >
              <div className="bg-muted relative h-32 w-32 rounded-full p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                <div className="bg-background h-full w-full overflow-hidden rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
                  <Orb
                    colors={colors}
                    seed={(index + 1) * 1000}
                    agentState={agent}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAgent(null)}
            disabled={agent === null}
          >
            Idle
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAgent("listening")}
            disabled={agent === "listening"}
          >
            Listening
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={agent === "talking"}
            onClick={() => setAgent("talking")}
          >
            Talking
          </Button>
        </div>
      </div>
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/orb",
  },
  response: {
    name: "Response",
    description: "Streaming markdown response renderer for AI replies.",
    category: "Voice",
    component: <ResponseDemo />,
    code: `"use client"

import { useEffect, useState } from "react"
import { Response } from "@/components/ui/response"

const tokens = [
  "### Welcome", "\\n\\n", "This", " is", " a", " **rich", " markdown", "**", " showcase", " with", " multiple", " features.", "\\n\\n",
  "---", "\\n\\n", "## Data Table", "\\n\\n", "| Name", " | Role", " | Status", " |", "\\n", "|------|------|--------|", "\\n",
  "| Alice", " | Engineer", " | Active", " |", "\\n", "| Bob", " | Designer", " | Active", " |", "\\n", "| Carol", " | PM", " | Active", " |", "\\n\\n",
  "## Inspiration", "\\n\\n", "> *Simplicity", " is", " the", " ultimate", " sophistication.*", "\\n", "> —", " Leonardo", " da", " Vinci", "\\n\\n",
  "## Inline", " and", " Block", " Code", "\\n\\n", "Use", " \`let", " total", " =", " items.length\`", " to", " count", " elements.", "\\n\\n",
  "\`\`\`", "python", "\\n", "def", " greet(name):", "\\n", "    return", ' f"Hello, {name}!"', "\\n", 'print(greet("World"))', "\\n", "\`\`\`", "\\n\\n",
  "## Math", "\\n\\n", "Inline", " math:", " $a^2", " +", " b^2", " =", " c^2$", ".", "\\n\\n", "Displayed", " equation:", "\\n\\n",
  "$$", "\\n", "\\\\int_0^1", " x^2", " dx", " =", " \\\\frac{1}{3}", "\\n", "$$", "\\n\\n",
]

const ResponseDemo = () => {
  const [content, setContent] = useState("")
  useEffect(() => {
    let currentContent = ""
    let index = 0
    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index]
        setContent(currentContent)
        index++
      } else clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="h-full min-h-0 w-full overflow-hidden">
      <Response className="h-full overflow-auto p-10">{content}</Response>
    </div>
  )
}

export { ResponseDemo }
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/response",
  },
  "shimmering-text": {
    name: "Shimmering Text",
    description: "Text with a shimmer animation effect.",
    category: "Voice",
    component: <ShimmeringTextDemo />,
    code: `"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ShimmeringText } from "@/components/ui/shimmering-text"

const phrases = [
  "Agent is thinking...",
  "Processing your request...",
  "Analyzing the data...",
  "Generating response...",
  "Almost there...",
]

export function ShimmeringTextDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card w-full rounded-lg border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Text Shimmer Effect</h3>
        <p className="text-muted-foreground text-sm">
          Animated gradient text with automatic cycling
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-muted/10 flex items-center justify-center rounded-lg py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ShimmeringText text={phrases[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/shimmering-text",
  },
  "speech-input": {
    name: "Speech Input",
    description: "Microphone input with real-time transcription via ElevenLabs Scribe.",
    category: "Voice",
    component: <SpeechInputDemo />,
    code: `"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { getScribeToken } from "@/registry/elevenlabs-ui/blocks/realtime-transcriber-01/actions/get-scribe-token"
import { Input } from "@/components/ui/input"
import {
  SpeechInput,
  SpeechInputCancelButton,
  SpeechInputPreview,
  SpeechInputRecordButton,
} from "@/components/ui/speech-input"
import { Textarea } from "@/components/ui/textarea"

async function getToken() {
  const result = await getScribeToken()
  if (result.error) throw new Error(result.error)
  return result.token!
}

function TextareaWithSpeechInputRight() {
  const [value, setValue] = useState("")
  const valueAtStartRef = useRef("")
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Jot down some thoughts..."
        className="min-h-[120px] resize-none rounded-2xl px-3.5 pt-3 pb-14"
      />
      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        <SpeechInput
          size="sm"
          getToken={getToken}
          onStart={() => { valueAtStartRef.current = value }}
          onChange={({ transcript }) => { setValue(valueAtStartRef.current + transcript) }}
          onStop={({ transcript }) => { setValue(valueAtStartRef.current + transcript) }}
          onCancel={() => { setValue(valueAtStartRef.current) }}
          onError={(error) => toast.error(String(error))}
        >
          <SpeechInputCancelButton />
          <SpeechInputPreview placeholder="Listening..." />
          <SpeechInputRecordButton />
        </SpeechInput>
      </div>
    </div>
  )
}

function TextareaWithSpeechInputLeft() {
  const [value, setValue] = useState("")
  const valueAtStartRef = useRef("")
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Jot down some thoughts..."
        className="min-h-[120px] resize-none rounded-2xl px-3.5 pt-3 pb-14"
      />
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <SpeechInput
          size="sm"
          getToken={getToken}
          onStart={() => { valueAtStartRef.current = value }}
          onChange={({ transcript }) => { setValue(valueAtStartRef.current + transcript) }}
          onStop={({ transcript }) => { setValue(valueAtStartRef.current + transcript) }}
          onCancel={() => { setValue(valueAtStartRef.current) }}
          onError={(error) => toast.error(String(error))}
        >
          <SpeechInputRecordButton />
          <SpeechInputPreview placeholder="Listening..." />
          <SpeechInputCancelButton />
        </SpeechInput>
      </div>
    </div>
  )
}

function InputWithSpeechInput() {
  const [value, setValue] = useState("")
  const valueAtStartRef = useRef("")
  return (
    <div className="flex items-center gap-2.5">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Give this idea a title..."
        className="min-w-0 flex-1 px-3.5 text-base transition-[flex-basis] duration-200 md:text-sm"
      />
      <SpeechInput
        getToken={getToken}
        className="shrink-0"
        onStart={() => { valueAtStartRef.current = value }}
        onChange={({ transcript }) => { setValue(valueAtStartRef.current + transcript) }}
        onStop={({ transcript }) => { setValue(valueAtStartRef.current + transcript) }}
        onCancel={() => { setValue(valueAtStartRef.current) }}
        onError={(error) => toast.error(String(error))}
      >
        <SpeechInputCancelButton />
        <SpeechInputRecordButton />
      </SpeechInput>
    </div>
  )
}

export function SpeechInputDemo() {
  return (
    <div className="absolute inset-0 space-y-4 overflow-auto rounded-2xl p-10">
      <TextareaWithSpeechInputRight />
      <TextareaWithSpeechInputLeft />
      <InputWithSpeechInput />
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/speech-input",
  },
  "transcript-viewer": {
    name: "Transcript Viewer",
    description: "Word-level transcript viewer synced with audio playback.",
    category: "Voice",
    component: <TranscriptViewerDemo />,
    code: `"use client"

import { useEffect, useState } from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import {
  TranscriptViewerAudio,
  TranscriptViewerContainer,
  TranscriptViewerPlayPauseButton,
  TranscriptViewerScrubBar,
  TranscriptViewerWords,
  type CharacterAlignmentResponseModel,
} from "@/components/ui/transcript-viewer"
import { Skeleton } from "@/components/ui/skeleton"

const TranscriptViewerDemo = () => {
  const audioSrc = "/sounds/transcript-viewer/transcript-viewer-audio.mp3"
  const [alignment, setAlignment] = useState<CharacterAlignmentResponseModel | undefined>(undefined)

  useEffect(() => {
    fetch("/sounds/transcript-viewer/transcript-viewer-alignment.json")
      .then((res) => res.json())
      .then((data) => setAlignment(data))
  }, [])

  return (
    <div className="flex w-full flex-col gap-4">
      <TranscriptViewerContainer
        key={audioSrc}
        className="bg-card w-full rounded-xl border p-4"
        audioSrc={audioSrc}
        audioType="audio/mpeg"
        alignment={
          alignment ?? {
            characters: [],
            characterStartTimesSeconds: [],
            characterEndTimesSeconds: [],
          }
        }
      >
        <TranscriptViewerAudio className="sr-only" />
        {alignment ? (
          <>
            <TranscriptViewerWords />
            <div className="flex items-center gap-3">
              <TranscriptViewerScrubBar />
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-1/2" />
            <Skeleton className="h-2 w-full" />
            <div className="-mt-1 flex items-center justify-between">
              <Skeleton className="h-2 w-6" />
              <Skeleton className="h-2 w-6" />
            </div>
          </div>
        )}
        <TranscriptViewerPlayPauseButton
          className="w-full cursor-pointer"
          size="default"
          disabled={!alignment}
        >
          {({ isPlaying }) => (
            <>
              {isPlaying ? (
                <><PauseIcon className="size-4" /> Pause</>
              ) : (
                <><PlayIcon className="size-4" /> Play</>
              )}
            </>
          )}
        </TranscriptViewerPlayPauseButton>
      </TranscriptViewerContainer>
    </div>
  )
}

export { TranscriptViewerDemo }
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/transcript-viewer",
  },
  "voice-button": {
    name: "Voice Button",
    description: "Button for voice recording with state (idle, recording, processing).",
    category: "Voice",
    component: <VoiceButtonDemo />,
    code: `"use client"

import { useEffect, useState } from "react"
import { VoiceButton } from "@/components/ui/voice-button"

export function VoiceButtonDemo() {
  const [state, setState] = useState<"idle" | "recording" | "processing" | "success" | "error">("idle")

  const handlePress = () => {
    if (state === "idle") {
      setState("recording")
    } else if (state === "recording") {
      setState("processing")
      setTimeout(() => {
        setState("success")
        setTimeout(() => setState("idle"), 1500)
      }, 1000)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault()
        handlePress()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [state])

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <VoiceButton
        label="Voice"
        trailing="⌥Space"
        state={state}
        onPress={handlePress}
        className="min-w-[180px]"
      />
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/voice-button",
  },
  "voice-picker": {
    name: "Voice Picker",
    description: "Dropdown to select an ElevenLabs voice with preview.",
    category: "Voice",
    component: <VoicePickerDemo />,
    code: `"use client"

import { useState } from "react"
import type { ElevenLabs } from "@elevenlabs/elevenlabs-js"
import { VoicePicker } from "@/components/ui/voice-picker"

const voices: ElevenLabs.Voice[] = [
  {
    voiceId: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    category: "premade",
    labels: { accent: "american", descriptive: "casual", age: "young", gender: "female", language: "en", use_case: "conversational" },
    description: "Matter-of-fact, personable woman. Great for conversational use cases.",
    previewUrl: "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/b4928a68-c03b-411f-8533-3d5c299fd451.mp3",
  },
  {
    voiceId: "29vD33N1CtxCmqQRPOHJ",
    name: "Drew",
    category: "premade",
    labels: { accent: "american", description: "well-rounded", age: "middle_aged", gender: "male", use_case: "news" },
    previewUrl: "https://storage.googleapis.com/eleven-public-prod/premade/voices/29vD33N1CtxCmqQRPOHJ/b99fc51d-12d3-4312-b480-a8a45a7d51ef.mp3",
  },
  {
    voiceId: "2EiwWnXFnvU5JabPnv8n",
    name: "Clyde",
    category: "premade",
    labels: { accent: "american", descriptive: "intense", age: "middle_aged", gender: "male", language: "en", use_case: "characters_animation" },
    description: "Great for character use-cases",
    previewUrl: "https://storage.googleapis.com/eleven-public-prod/premade/voices/2EiwWnXFnvU5JabPnv8n/65d80f52-703f-4cae-a91d-75d4e200ed02.mp3",
  },
]

export function VoicePickerDemo() {
  const [selectedVoice, setSelectedVoice] = useState<string>("21m00Tcm4TlvDq8ikWAM")
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full max-w-lg">
      <VoicePicker
        voices={voices}
        value={selectedVoice}
        onValueChange={(value) => {
          setSelectedVoice(value)
          setOpen(true)
        }}
        open={open}
        onOpenChange={setOpen}
        placeholder="Select a voice..."
      />
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/voice-picker",
  },
  waveform: {
    name: "Waveform",
    description: "Static or scrolling waveform from numeric data.",
    category: "Voice",
    component: <WaveformDemo />,
    code: `"use client"

import { ScrollingWaveform } from "@/components/ui/waveform"

export function WaveformDemo() {
  return (
    <div className="bg-card w-full rounded-lg border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Waveform</h3>
        <p className="text-muted-foreground text-sm">
          Real-time audio visualization with smooth scrolling animation
        </p>
      </div>
      <ScrollingWaveform
        height={80}
        barWidth={3}
        barGap={2}
        speed={30}
        fadeEdges={true}
        barColor="gray"
      />
    </div>
  )
}
`,
    cliInstallCommand: "npx ai-scaffold-kit add @voice/waveform",
  },
}


