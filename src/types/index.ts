export type ProductCategory = "landing-page" | "web-app" | "mobile-app" | "saas" | "ecommerce" | "ai-integration" | "dashboard" | "design-only";
export type ProductAddOn = "seo-advanced" | "auth-system" | "payment-integration" | "admin-dashboard" | "mobile-responsive" | "cms" | "api-integration" | "analytics" | "multilingual" | "ai-chatbot" | "performance-audit" | "maintenance-1y";
export type DeliverySpeed = "standard" | "express" | "urgent";

export interface QuoteProduct { id: ProductCategory; name: string; description: string; basePrice: number; estimatedDays: number; icon: string; popular?: boolean; tag?: string; }
export interface QuoteAddOn { id: ProductAddOn; name: string; description: string; price: number; days: number; }
export interface QuoteFormData {
  product: ProductCategory | null; addOns: ProductAddOn[]; delivery: DeliverySpeed; budget: number;
  projectName: string; description: string; referenceUrls: string; hasDesign: boolean; hasCopy: boolean;
  firstName: string; lastName: string; email: string; phone: string; company: string; linkedin: string;
}
export interface QuoteEstimate { subtotal: number; deliveryMultiplier: number; total: number; estimatedDays: number; deliveryDate: Date; }
export interface Project { id: string; title: string; category: string; description: string; stack: string[]; status: "delivered" | "ongoing" | "coming-soon"; accentColor: string; metrics?: { label: string; value: string }[]; url?: string; }
export interface Service { id: string; title: string; description: string; icon: string; features: string[]; popular?: boolean; stack: string[]; }
export interface Testimonial { id: string; name: string; role: string; company: string; content: string; rating: number; }
export interface FAQItem { question: string; answer: string; }
export interface BlogPost { slug: string; title: string; excerpt: string; content: string; category: string; tags: string[]; publishedAt: string; readingTime: number; author: { name: string; role: string; }; featured?: boolean; coverGradient?: string; }
