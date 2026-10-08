import {
  Activity,
  BarChart2,
  HelpCircle,
  Home,
  Layers,
  Shield,
  Star,
  Users,
} from "lucide-react";
import type { NotchItemData } from "@/types/notch-nav";

export const NAV_ITEMS: NotchItemData[] = [
  { id: "home",          label: "Home",         icon: Home },
  { id: "features",     label: "Features",     icon: Layers },
  { id: "how-it-works", label: "How It Works", icon: Activity },
  { id: "about",        label: "About",        icon: Users },
  { id: "security",     label: "Security",     icon: Shield },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "faq",          label: "FAQ",          icon: HelpCircle },
  { id: "guidelines",   label: "Guidelines",   icon: BarChart2 },
];
