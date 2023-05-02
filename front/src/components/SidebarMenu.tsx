import "./SidebarMenu.css";
import { useNavigate } from "react-router-dom";
import { CSSProperties, useRef, useState, useEffect } from "react";
import IconBox from "./IconBox";

import { AiFillFileAdd, AiOutlineSearch } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { WizdomLogo } from "./WizdomLogo";

const pages = [
    {
        icon: <WizdomLogo />,
        title: "Todo lo que necesitas acerca de Wizdom",
        option: "Inicio",
        route: "/home",
    },
    {
        icon: <AiFillFileAdd />,
        title: "Agrega nuevos articulos al repositorio",
        option: "crear",
        route: "/create",
    },
    {
        icon: <AiOutlineSearch />,
        title: "Obten resultados entre todos los articulos existentes",
        option: "buscar",
        route: "/",
    },
    {
        icon: <HiOutlineDocumentDuplicate />,
        title: "Accede al compilado de todos los articulos que has creado",
        option: "posts",
        route: "/posts",
    },
    {
        icon: <VscLibrary />,
        title: "",
        option: "guardados",
        route: "/",
    },
    {
        icon: <IoSettingsOutline />,
        title: "",
        option: "ajustes",
        route: "/tests",
    },
];

// export default function SidebarMenu() {
//   const minArrowRef = useRef<HTMLSpanElement>(null);
//   const maxArrowRef = useRef<HTMLSpanElement>(null);
//   const [hidden, setHidden]: [Boolean | null, Function] = useState(null);
//   const [hasOverflow, setHasOverflow]: [Boolean, Function] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {

//     const handleResize = () => {
//         console.log('resizing')
//         console.log(`hasOverflow ${hasOverflow} | hidden ${hidden}`)

//         const item = containerRef.current?.children[5].children[0] as HTMLDivElement
//         if(hidden){
//             setHasOverflow((val : Boolean) => val)
//             // setHidden((val : Boolean) => val)
//         }else{
//             let overflow = item.clientWidth < item.scrollWidth
//             console.log(`setHidden(${overflow})`)
//             console.log(`setHasOverflow(${overflow})`)
//             setHidden(overflow)
//             setHasOverflow(overflow)
//         }
//     };

//     const resizeObserver = new ResizeObserver(handleResize);

//     if (containerRef.current) {
//         resizeObserver.observe(containerRef.current);
//     }

//     handleResize()

//     return () => {
//         console.log('unmounting')
//         if (containerRef.current) {
//             resizeObserver.unobserve(containerRef.current);
//         }
//         resizeObserver.disconnect();
//     };
//   }, []);

//   const navigate = useNavigate();
//   const handleRedirect = (route: string) => navigate(route);

//   const minimize = () => {
//     setHidden(true);
//   };
//   const maximize = () => {
//     setHidden(hasOverflow);
//   };

//   const styles: CSSProperties = {
//     width: hidden || hasOverflow ? "min-content" : undefined,
//     // backgroundColor : (hasOverflow) ? 'red' : undefined,
//   };

//   return (
//     <div className="sidebar-menu" style={styles} ref={containerRef}>
//       {hidden ? (
//         <span className="arrow" onClick={maximize} ref={maxArrowRef}>
//           <BsArrowRight />
//         </span>
//       ) : (
//         <span className="arrow" onClick={minimize} ref={minArrowRef}>
//           <BsArrowLeft />
//         </span>
//       )}
//       {pages.map((page, k) => {
//         return (
//           <div
//             key={k}
//             className="item"
//             title={page.title}
//             onClick={() => handleRedirect(page.route)}
//           >
//             <div className="inner-area">
//               <IconBox>{page.icon}</IconBox>
//               {(!hidden && !hasOverflow) && (
//                 <span className="text">{page.option}</span>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export default function SidebarMenu() {
    const minArrowRef = useRef<HTMLSpanElement>(null);
    const maxArrowRef = useRef<HTMLSpanElement>(null);
    const hiddenRef = useRef<Boolean | null>(false);
    const [hasOverflow, setHasOverflow]: [Boolean, Function] = useState(false);
    const [ _ , setUpdates] : [number, Function] = useState(0)

    const update = () => {
        setUpdates((count : number) => count+1)
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const item = containerRef.current?.children[5].children[0] as HTMLDivElement;
            
            let overflow = item.clientWidth < item.scrollWidth

            if(overflow){
                hiddenRef.current = true
                setHasOverflow(true)
            }else{
                setHasOverflow(false)
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        handleResize();

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
            resizeObserver.disconnect();
        };
    }, []);

    const navigate = useNavigate();
    const handleRedirect = (route: string) => navigate(route);

    const minimize = () => {
        hiddenRef.current = true;
        update()
    };
    const maximize = () => {
        hiddenRef.current = hasOverflow;
        update()
    };

    const styles: CSSProperties = {
        width: hiddenRef.current || hasOverflow ? "min-content" : undefined,
    };

    return (
        <div className="sidebar-menu" style={styles} ref={containerRef}>
            {hiddenRef.current ? (
                <span className="arrow" onClick={maximize} ref={maxArrowRef}>
                    <BsArrowRight />
                </span>
            ) : (
                <span className="arrow" onClick={minimize} ref={minArrowRef}>
                    <BsArrowLeft />
                </span>
            )}
            {pages.map((page, k) => {
                return (
                    <div
                        key={k}
                        className="item"
                        title={page.title}
                        onClick={() => handleRedirect(page.route)}
                    >
                        <div className="inner-area">
                            <IconBox>{page.icon}</IconBox>
                            { (!hiddenRef.current && !hasOverflow) && (
                                <span className="text">{page.option}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
