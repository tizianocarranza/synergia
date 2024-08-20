
export default function Footer() {
    return (
        
        <footer className="relative flex flex-col flex-1 justify-center items-center w-full text-sm h-half-screen box-border">
            <ul className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 items-center justify-center content-center h-half-screen w-full  overflow-hidden" >
                <li className="flex justify-center items-center h-full w-full">
                    <h1 className="synergia-header" >Synergia</h1>
                </li>
                <li className="flex justify-center items-center h-full w-full">
                    <ul className="flex flex-col items-center justify-center h-full w-full gap-6">
                        <li>About</li>
                        <li>FAQ</li>
                        <li>Contact us</li>
                    </ul>
                </li>
            </ul>
            
        </footer>
    )
}
