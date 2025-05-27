#!/usr/bin/env node

/**
 * Script para probar la sincronización de artículos localmente
 * Uso: node scripts/sync-articles.js [username]
 */

import fetch from 'node-fetch';

async function testSync() {
  const username = process.argv[2] || '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  console.log('🚀 Iniciando prueba de sincronización...');
  console.log(`📍 URL base: ${baseUrl}`);
  console.log(`👤 Usuario: ${username || 'default'}`);
  
  try {
    const response = await fetch(`${baseUrl}/api/articles/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Sincronización exitosa:');
      console.log(`   📊 Artículos procesados: ${result.count}`);
      console.log(`   🕒 Timestamp: ${result.timestamp}`);
      console.log(`   📡 Fuente: ${result.source}`);
    } else {
      console.error('❌ Error en la sincronización:');
      console.error(`   💬 Mensaje: ${result.error}`);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

async function testCronSync() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const cronSecret = process.env.NEXT_PUBLIC_CRON_SECRET;
  
  console.log('🤖 Probando endpoint de cron...');
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (cronSecret) {
      headers['Authorization'] = `Bearer ${cronSecret}`;
    }
    
    const response = await fetch(`${baseUrl}/api/cron/sync-articles`, {
      method: 'GET',
      headers
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Cron sync exitoso:');
      console.log(`   📊 Artículos procesados: ${result.articlesProcessed}`);
      console.log(`   🕒 Timestamp: ${result.timestamp}`);
    } else {
      console.error('❌ Error en cron sync:');
      console.error(`   💬 Mensaje: ${result.error}`);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

// Determinar qué función ejecutar basado en argumentos
const command = process.argv[2];

if (command === 'cron') {
  testCronSync();
} else {
  testSync();
} 