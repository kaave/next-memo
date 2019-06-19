import React from 'react'
import Link from 'next/link'

const SecondPage: React.FunctionComponent = () => (
    <div>
        <h1>Welcome To Second Page</h1>
        <Link href='/'><button type='button'>Go Back</button></Link>
    </div>
)

export default SecondPage
