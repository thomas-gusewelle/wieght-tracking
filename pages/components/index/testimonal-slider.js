import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {BiChevronLeft, BiChevronRight} from "react-icons/bi"

const TestimonalSlider = () => {
    const [sliderSwitch, setSliderSwitch] = useState(1)

    const sliderDown = () => {
        if (sliderSwitch === 1) {
            setSliderSwitch(3);
        } else {
            setSliderSwitch(sliderSwitch - 1);
        }
    }

    const sliderUp = () => {
        if (sliderSwitch === 3) {
            setSliderSwitch(1);
        } else {
            setSliderSwitch(sliderSwitch + 1);
        }
    }
    
    return(
        <div className="pb-6">
          <SliderBody sliderSwitch={sliderSwitch} sliderDown={sliderDown} sliderUp={sliderUp}/> 
          <div className="flex justify-center gap-3">
            <button className={`h-3 ${sliderSwitch === 1 ? 'w-6 bg-green-500' : 'w-3 bg-white'} transition-all duration-200 ease-in-out rounded-full`} onClick={() => setSliderSwitch(1)}/>
            <button className={`h-3 ${sliderSwitch === 2 ? 'w-6 bg-green-500' : 'w-3 bg-white'} transition-all duration-200 ease-in-out rounded-full`} onClick={() => setSliderSwitch(2)}/>
            <button className={`h-3 ${sliderSwitch === 3 ? 'w-6 bg-green-500' : 'w-3 bg-white'} transition-all duration-200 ease-in-out rounded-full`} onClick={() => setSliderSwitch(3)}/>
          </div> 
        </div>
    )    
}

export default TestimonalSlider


const SliderBody = ({sliderSwitch, setSliderSwitch, sliderDown, sliderUp}) => {

    return (
        <div className="overflow-hidden relative flex items-center">
            <div 
            onClick={sliderDown}
            className="absolute left-2 flex items-center justify-center p-1 cursor-pointer bg-stone-900 rounded-3xl opacity-60 hover:opacity-100 transition-all duration-200 ease-in-out md:left-12">
                <BiChevronLeft size={30}/>
            </div>
            <div 
            onClick={sliderUp}
            className="absolute right-2 flex items-center justify-center p-1 cursor-pointer bg-stone-900 rounded-3xl opacity-60 hover:opacity-100 transition-all duration-200 ease-in-out md:right-12 ">
                <BiChevronRight size={30}/>
            </div>
        <LayoutGroup>
           <AnimatePresence exitBeforeEnter={true}>
           { sliderSwitch === 1 && 
            <motion.div 
                    key={1}
                    initial={{x: -500, opacity:0, display: 'static'}}
                    animate={{x:0, opacity:1, display: 'static'}}
                    transition={{duration: .2}}
                    exit={{x:500, opacity:0 }}
                    
                    className={`py-6 px-4 text-center max-w-sm mx-auto sm:max-w-prose`}>
                    <p>"I love how Lossize makes it so simple to see my goal and how my daily progress is pushing me towards that goal!"</p>
                    <h2 className="mt-2 text-lg text-green-500">Thomas G.</h2>
                </motion.div>
           }           
           { sliderSwitch === 2 && 
            <motion.div 
                    key={2}
                    initial={{x: -500, opacity:0, display: 'static'}}
                    animate={{x:0, opacity:1, display: 'static'}}
                    transition={{duration: .2}}
                    exit={{x:500, opacity:0 }}
                    
                    className={`py-6 px-4 text-center max-w-sm mx-auto sm:max-w-prose`}>
                    <p>"Lossize takes all of the compleity that many health apps have and makes it so simple anyone can use it!"</p>
                    <h2 className="mt-2 text-lg text-green-500">George P.</h2>
                </motion.div>
           }           
           { sliderSwitch === 3 && 
            <motion.div
                    key={3} 
                    initial={{x: -500, opacity:0, display: 'static'}}
                    animate={{x:0, opacity:1, display: 'static'}}
                    transition={{duration: .2}}
                    exit={{x:500, opacity:0 }}
                    
                    className={`py-6 px-4 text-center max-w-sm mx-auto sm:max-w-prose`}>
                    <p>"As someone who strugles with my weight I love how Lossize helps me stay on top of my weight and easily see my changes in wieght over time."</p>
                    <h2 className="mt-2 text-lg text-green-500">Anna H.</h2>
                </motion.div>
           }
           </AnimatePresence>
           </LayoutGroup>
        </div>
    )

 
       
}

