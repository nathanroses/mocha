import { PineconeClient } from '@pinecone-database/pinecone'

// Create a mock implementation for when Pinecone isn't available
class MockPineconeIndex {
  async upsert() { return { upsertedCount: 0 } }
  async query() { return { matches: [] } }
  async fetch() { return { vectors: {} } }
}

class MockPineconeClient {
  async Index() {
    return new MockPineconeIndex()
  }
}

export const getPineconeClient = async () => {
  // Check if we're in a development/build environment where Pinecone might not be configured
  if (!process.env.PINECONE_API_KEY) {
    console.warn('PINECONE_API_KEY not found, using mock Pinecone client')
    return new MockPineconeClient() as unknown as PineconeClient
  }

  try {
    const client = new PineconeClient()
    
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: 'us-east1-gcp', // Make sure this matches your environment
    })
    
    return client
  } catch (error) {
    console.warn('Failed to initialize Pinecone client, using mock client instead', error)
    return new MockPineconeClient() as unknown as PineconeClient
  }
}
