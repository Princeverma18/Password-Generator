import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);

  const [character, setCharacter] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*()_+"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);     
    }

    setPassword(pass)
    

  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length,number, character, passwordGenerator]);


  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();  // copy kra hua dikhne k liye
    // passwordRef.current?.setSelectionRange(0, 4);  // Range m copy krne k liye
    window.navigator.clipboard.writeText(password); // Copy krne k liye text ko
  },[password]);

  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 px-4 py-3 my-8 bg-gray-800'>
    <h1 className='text-white text-=center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input className='outline-none w-full py-1 px-3' type="text" value={password} placeholder='password' readOnly ref={passwordRef}/>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordClipboard}>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
        <label>length : {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={number} id='numberInput' onChange={() => {setNumber((prev) => !prev);}}/>
        <label className=''>Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={character} id='charInput' onChange={() => {setCharacter((prev) => !prev);}}/>
      <label className=''>Character</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
