import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <>

      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">

        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-[150px] md:text-[200px] font-black text-foreground leading-none tracking-tighter opacity-10">
            404
          </h1>

          <div className="-mt-12 md:-mt-20">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto">
              We couldn't locate the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all">
                <Link href="/" className="flex items-center gap-2">
                  <Home size={18} />
                  Back to Home
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-border hover:bg-muted text-foreground rounded-full h-12 px-8 text-base">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} MHDEVFUSION. All rights reserved.
        </div>
      </div>
    </>
  )
}
