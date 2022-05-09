import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { display } from "@mui/system"

const TestimonalSlider = () => {
    const [sliderSwitch, setSliderSwitch] = useState(1)
    
    return(
        <div className="pb-6">
          <SliderBody sliderSwitch={sliderSwitch}/> 
          <div className="flex justify-center gap-3">
            <button className={`h-3 ${sliderSwitch === 1 ? 'w-6' : 'w-3'} transition-all duration-200 ease-in-out rounded-full bg-white`} onClick={() => setSliderSwitch(1)}/>
            <button className={`h-3 ${sliderSwitch === 2 ? 'w-6' : 'w-3'} transition-all duration-200 ease-in-out rounded-full bg-white`} onClick={() => setSliderSwitch(2)}/>
            <button className={`h-3 ${sliderSwitch === 3 ? 'w-6' : 'w-3'} transition-all duration-200 ease-in-out rounded-full bg-white`} onClick={() => setSliderSwitch(3)}/>
          </div> 
        </div>
    )    
}

export default TestimonalSlider


const SliderBody = ({sliderSwitch}) => {

    return (
        <div className="overflow-hidden">
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ipsum at nunc placerat lacinia. Vestibulum suscipit purus purus, eu egestas ex laoreet et.</p>
                    <h2 className="mt-2 text-lg text-green-500">George - Lost 25 lbs</h2>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ipsum at nunc placerat lacinia. Vestibulum suscipit purus purus, eu egestas ex laoreet et.</p>
                    <h2 className="mt-2 text-lg text-green-500">G - Lost 25 lbs</h2>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ipsum at nunc placerat lacinia. Vestibulum suscipit purus purus, eu egestas ex laoreet et.</p>
                    <h2 className="mt-2 text-lg text-green-500">Geor - Lost 25 lbs</h2>
                </motion.div>
           }
           </AnimatePresence>
           </LayoutGroup>
        </div>
    )

 
       
}

