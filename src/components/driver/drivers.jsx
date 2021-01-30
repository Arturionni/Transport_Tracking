import React, {memo,useEffect, useState} from 'react';
import './Leftpanel.css'
import Driver from './driver'
import driverContainer from './driverContainer';
import Paginator from '../Common/Paginator/Paginator';
import DriverCSS from './driver.module.css'


const Drivers = ({currentPage,onPageChanged, totalItemsCount, pageSize, drivers, ...props}) => {

    
    useEffect(() => {
        document.getElementById('side-open').onclick = function () {
            document.getElementById('side-open').hidden = true;
        }
        document.getElementById('side-button-2').onclick = function () {
            document.getElementById('side-open').hidden = false;
        }
    }, []);

    // const [Clicked, setClicked] = useState(false)
    // const countdownElement = document.querySelector('.hidden'); // получаем див каунт довн
    //  const getInfo = () => {
    //     setClicked(!Clicked);
    //     if (Clicked === false){
            
    //     }
    //     else{
    //         countdownElement.innerHTML = `<div id="driver-data-add" className='driver-data-add hidden' > `
    //     }
    // }
    return <>
        <input type="checkbox" id="side-checkbox" />
        <div className="side-panel">
            <label id='side-button-2' className="side-button-2" htmlFor="side-checkbox">+</label>
            <div className="side-title">Меню:</div>
            <p>Водители:</p>
            <div>
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}
         {/* // <Driver driver={drivers} /> */}

                  {  drivers.map((driver,index) => <Driver driver={driver} index={index}/>)}
       
            
            </div>
        </div>
        <div className="side-button-1-wr">
            <label className="side-button-1" htmlFor="side-checkbox">
                <div id='side-open' className="side-b side-open">Меню</div>
            </label>

        </div>
        
    </>

}
export default memo(Drivers)