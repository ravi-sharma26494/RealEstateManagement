import { useState, useContext, useEffect } from "react";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate } from "react-router-dom";

import "../css/list.css";
import Listings from "./listings";
import "../css/basicinfo.css";
import NewHeader from "./NewHeader";
import NewLogo from "./NewLogo";
import PropertyImage from "./PropertyImage";


const List =() => {
  const navigate = useNavigate();
  const { logindata, setLoginData } = useContext(LoginContext);

  const [info, setInfo] = useState(false);
  const DashboardValid = async () => {
  let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const recivedData = await res.json();

    if (recivedData.status == 401 || !recivedData) {
      navigate("/");
    } else {
    setLoginData(recivedData);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setInfo(true);
    }, 2000);
  }, []);

  const [listData, setData] = useState([]);
  const [ppdID, setppdID] = useState();
  
  
  const getData = async()=>{
    const response = await fetch("/api/listing");
    const data = await response.json();
    setData(data.data);
    //console.log(data.data)
  }
  
  useEffect(() => {
      getData();
    },[]);
  
  function parent(chilData) {
    setppdID(chilData);
  }
  //const [hideImage, setHideImage] = useState('open');
  const [activeImage, setActiveImage] = useState([{myimage:''}]);
  const [visible, setVisible] = useState('notvisible')
  
  
  // const handleClick = async (id)=>{
  //   const list = [...activeImage];
  //   setVisible("visible");
  // }
  
  const [show, setShow] = useState(false);
  const[imageItem, setImageItem] = useState();
  return (
    <>
  <NewHeader />
  <NewLogo />
      <div className="content-listings-content-container">
        <div className="content-list-headers">
          <Listings myPPDID={parent}></Listings>
          <div className="content-list-headers ul-list">
            <ul>
              <li>PPD ID</li>
              <li>Image</li>
              <li>Property</li>
              <li>Contact</li>
              <li>Area</li>
              <li>Views</li>
              <li>Status</li>
              <li>Days Left</li>
              {/* <li>Action</li> */}
            </ul>
          </div>
        </div>
        {listData
          .filter((val) => {
            if (!ppdID) {
              return val;
            } else if (val.ppdid.includes(ppdID)) {
              return val;
            }
          })
          .map((item, key) => {
            let status = "Unsold";
            if (item.views > 50) {
              status = "Sold";
            }
            return (
              <div
                className="content-list-headers content-list-items "
                key={key}
              >
                <ul>
                  <li>{item.ppdid}</li>
                  <li className="img-section"  
                  onClick={()=>{
                    setShow(true);
                      setImageItem(item)
                    }}>
                    <i className="fa fa-image" style={{ color: "#DFDFDF" }}>
                      {
                        // <span className={visible}>
                        //   <img src={item.image} alt="property__view" className={visible}/> 
                        //   <span  className = "hide__img"> X </span>
                        // </span> 
                      }
                    </i>
                  </li>
                  <li>{item.property}</li>
                  <li>{item.contact}</li>
                  <li>{item.area}</li>
                  <li>{item.views}</li>
                  <li>{status}</li>
                  <li>{item.daysleft}</li>
                  {/* <li>
                    <i className="fa fa-edit" style={{ color: "#DFDFDF" }}></i>
                    <i className="fa fa-eye" style={{ color: "#DFDFDF" }}></i>
                  </li> */}
                </ul>
              </div>
            );
          })}
          <PropertyImage show={show} imageItem={imageItem} onClose = {()=>setShow(false)}/>
      </div>
    </>
  );
};

export default List;
