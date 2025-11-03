import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Jax's predictive AI has completely transformed my trading strategy. The on-chain analysis and automated bots helped me increase my portfolio by 340% in 6 months. The rumor fact-checking alone is worth the subscription.",
      name: "Marcus Chen",
      title: "Professional Crypto Trader",
      avatar: "MC",
    },
    {
      quote:
        "I've tried every trading platform out there, but nothing comes close to Jax. The live pipelines catch opportunities before they hit Twitter, and the explainable AI gives me confidence in every trade. Game changer.",
      name: "Sarah Rodriguez",
      title: "DeFi Investor & Analyst",
      avatar: "SR",
    },
    {
      quote:
        "As someone managing multiple portfolios, Jax's automated bots and risk management tools are invaluable. The 6 years of training data means the AI actually understands market cycles. Best investment I've made.",
      name: "David Kim",
      title: "Crypto Fund Manager",
      avatar: "DK",
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-balance px-4">
              Trusted by Crypto Traders Worldwide
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-4">
              See what professional traders are saying about Jax's predictive AI platform.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="mb-4 text-4xl">"</div>
                <p className="italic text-muted-foreground text-sm sm:text-base leading-relaxed">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
