// import React from 'react'
 import { generateSecretKey, getPublicKey, } from 'nostr-tools'
 import { Relay } from 'nostr-tools/relay'
 import { useState } from 'react';
 import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { useEffect } from 'react';

const App = () => {

  const [sk, setSk] = useState(generateSecretKey());
  const [pk, setPk] = useState(getPublicKey(sk));
  const [relay, setRelay] = useState(null);

  let skHex = bytesToHex(sk)
  // let pkHex = bytesToHex(pk)

  useEffect(() => {
  const connectRelay = async () => {
    const relay = Relay.connect('wss://relay.damus.io')
    await Relay.connect();

    relay.on('connect', () => {
      setRelay(relay)
    })
    relay.on('error', () => {
      console.log('failed to connect');
    })
  }


  connectRelay();
})
  

  return (
    
    <div>
      <p>Private Key: {skHex}</p>
      <p>Public Key: {pk}</p>
      {relay ? <p>Connected to {relay.url}</p> : <p>Couldn't connect to relay</p> }
    </div>
  )
}

export default App