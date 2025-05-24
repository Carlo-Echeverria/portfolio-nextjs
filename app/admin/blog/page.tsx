"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons"

export default function AdminBlogPage() {
  const [username, setUsername] = useState(process.env.DEVTO_USERNAME)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [syncResult, setSyncResult] = useState<{ message: string; count?: number } | null>(null)

  async function handleSync() {
    try {
      setSyncStatus('loading')
      const response = await fetch('/api/articles/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error syncing articles')
      }

      setSyncStatus('success')
      setSyncResult({
        message: data.message,
        count: data.savedCount,
      })
    } catch (error) {
      console.error('Error syncing articles:', error)
      setSyncStatus('error')
      setSyncResult({
        message: error instanceof Error ? error.message : 'Error desconocido',
      })
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Administración del Blog</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sincronizar artículos de DEV.to</CardTitle>
            <CardDescription>
              Obtener artículos de DEV.to y guardarlos en la base de datos local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Nombre de usuario de DEV.to
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Por ejemplo: ben"
                />
              </div>

              <Button
                onClick={handleSync}
                disabled={syncStatus === 'loading'}
                className="w-full"
              >
                {syncStatus === 'loading' ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  'Sincronizar artículos'
                )}
              </Button>

              {syncStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>
                    {syncResult?.message} 
                    {syncResult?.count !== undefined && (
                      <span className="font-semibold"> ({syncResult.count} artículos)</span>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {syncStatus === 'error' && (
                <Alert className="bg-red-50 border-red-200">
                  <Cross2Icon className="h-4 w-4 text-red-600" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{syncResult?.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestión de artículos</CardTitle>
            <CardDescription>
              Administrar los artículos existentes en la base de datos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/api/articles'}
                className="w-full"
              >
                Ver todos los artículos (JSON)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 