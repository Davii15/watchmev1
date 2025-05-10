"use client"

import { useState } from "react"
import Image from "next/image"
import { QrCode, Gift, Trophy, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrizesPage() {
  const [redeemCode, setRedeemCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const handleScanQR = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScanResult("TUCHEKI-AIRTIME-2023")
      setRedeemCode("TUCHEKI-AIRTIME-2023")
    }, 2000)
  }

  const handleRedeemCode = () => {
    // Simulate redemption process
    alert(`Code ${redeemCode} redeemed successfully! You've won 100 KES airtime.`)
    setRedeemCode("")
    setScanResult(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Win Exciting Prizes!
          </h1>
          <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
            Scan QR codes from our partners or enter redemption codes to win airtime, movie tickets, and more!
          </p>
        </div>

        <Tabs defaultValue="scan" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 bg-amber-950/50 border border-amber-900/50">
            <TabsTrigger value="scan" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Scan QR Code
            </TabsTrigger>
            <TabsTrigger value="redeem" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Redeem Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="mt-6">
            <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-400">Scan QR Code</CardTitle>
                <CardDescription className="text-amber-300/70">
                  Scan a QR code from our partners to win prizes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {isScanning ? (
                  <div className="relative w-64 h-64 mb-4 border-2 border-amber-500 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-full h-1 bg-amber-500 animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                    <Image
                      src="/placeholder.svg?height=256&width=256"
                      alt="QR Scanner"
                      width={256}
                      height={256}
                      className="object-cover"
                    />
                  </div>
                ) : scanResult ? (
                  <div className="text-center mb-4">
                    <div className="w-64 h-64 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-40 h-40 text-amber-900" />
                    </div>
                    <p className="text-lg font-medium text-amber-300">Code detected: {scanResult}</p>
                  </div>
                ) : (
                  <div className="w-64 h-64 mb-4 border-2 border-dashed border-amber-700/50 rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-amber-700/50" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                {scanResult ? (
                  <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleRedeemCode}>
                    Redeem Prize
                  </Button>
                ) : (
                  <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleScanQR}>
                    {isScanning ? "Scanning..." : "Start Scanning"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="redeem" className="mt-6">
            <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-400">Redeem Code</CardTitle>
                <CardDescription className="text-amber-300/70">
                  Enter a redemption code to claim your prize
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter redemption code (e.g., TUCHEKI-2023)"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                    className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                  />
                  <p className="text-sm text-amber-300/70">
                    Redemption codes can be found on promotional materials, partner locations, or after watching
                    specific trailers.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={handleRedeemCode}
                  disabled={!redeemCode.trim()}
                >
                  Redeem Prize
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Available Prizes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400 flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Available Prizes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 text-lg">Airtime Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-amber-400" />
                  </div>
                </div>
                <p className="text-sm text-center">Win airtime vouchers worth 50-500 KES for your mobile phone.</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 text-lg">Movie Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <Ticket className="h-8 w-8 text-amber-400" />
                  </div>
                </div>
                <p className="text-sm text-center">Free tickets to upcoming movie premieres at partner theaters.</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 text-lg">Exclusive Merchandise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-amber-400" />
                  </div>
                </div>
                <p className="text-sm text-center">Win t-shirts, caps, and other merchandise from Kenyan movies.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2 text-amber-300">Scan QR Code</h3>
              <p className="text-sm text-amber-200/70">
                Find QR codes on promotional materials or at the end of selected trailers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2 text-amber-300">Enter Code</h3>
              <p className="text-sm text-amber-200/70">
                Enter the redemption code you received from scanning the QR code.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2 text-amber-300">Claim Prize</h3>
              <p className="text-sm text-amber-200/70">
                Redeem your prize instantly or receive instructions on how to collect it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
