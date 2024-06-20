import React from 'react'
import LoginCarousel from './LoginSignUpPage/LoginCarousel/LoginCarousel'
import CarouselImg1 from '../Assets/LoginCarousel.png'

const LoginPage = () => {

  let slides = ["https://www.searchenginejournal.com/wp-content/uploads/2022/09/influencer-marketing2-631aeb9e3273a-sej.png",
     "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Finfluencer+india.jpg&h=570&w=855&q=100&v=20170226&c=1",
    "https://agencynetwork.org/assets/upload/article/835112326202038253232_6393005ccc516923b883acee_Influencer-Marketing.jpg",
    CarouselImg1,
   ]
  return (
   
     <div className="w-1/2">
        <LoginCarousel slides={slides} autoSlide={true}/>
        
   </div>
  )
}

export default LoginPage;