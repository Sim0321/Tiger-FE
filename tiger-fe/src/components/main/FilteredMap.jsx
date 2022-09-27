// eslint-disable-next-line

/*global kakao*/

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FilteredMap = ({ filteredVehicle }) => {
  const navigate = useNavigate();
  // const location = localStorage.getItem("location");
  const locationX = localStorage.getItem("locationX");
  const locationY = localStorage.getItem("locationY");

  // var centerCoords = new kakao.maps.LatLng(locationY, locationX);

  console.log(filteredVehicle);
  const createMap = () => {
    var centerCoords = new kakao.maps.LatLng(locationY, locationX);

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: centerCoords, // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    for (let i = 0; i < filteredVehicle.length; i++) {
      let coords = new kakao.maps.LatLng(
        filteredVehicle[i].locationY,
        filteredVehicle[i].locationX
      );

      let marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      let content =
        "<div style='width:288px; height: 85px'>" +
        '    <div class="info">' +
        '        <div class="body">' +
        '            <div class="img">' +
        `                <img src=${filteredVehicle[i].thumbnail} width="73" height="73">` +
        "           </div>" +
        '            <div class="desc">' +
        `            <div class="name"><a href="/vdetail/${filteredVehicle[i].vid}" class="link" style="text-decoration:none">${filteredVehicle[i].vbrand} ${filteredVehicle[i].vname}</a></div>` +
        `               <div class="ellipsis">${filteredVehicle[i].location}</div>` +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: content, // 인포윈도우에 표시할 내용
      });

      const clickToLink = () => {
        navigate(
          `/vdetail/${filteredVehicle[i].vid}?startDate=${filteredVehicle[i].startDate}&endDate=${filteredVehicle[i].endDate}`
        );
      };

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "click",
        clickToLink
        // navigate(`/vdetail/${filteredVehicle[i].vid}`)
      );

      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }

      map.setCenter(centerCoords);
    }
  };

  useEffect(() => {
    createMap();
  }, [filteredVehicle]);

  return <StVehicleMapBox id="map"></StVehicleMapBox>;
};

const StVehicleMapBox = styled.div`
  width: 50rem;
  height: 100vh;
  margin-bottom: 15px;
  .info {
    width: 286px;
    height: 84px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
  }
  .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  .info .body {
    position: relative;
    overflow: hidden;
  }
  .info .desc {
    position: relative;
    margin: 13px 0 0 90px;
    height: 75px;
  }
  .desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc .name {
    padding: 5px 0 0 0px;
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
  }
  .info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 73px;
    height: 71px;
    border: 1px solid #ddd;
    color: #888;
    overflow: hidden;
  }
  .info:after {
    content: "";
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
  }
  .info .link {
    color: #5085bb;
  }
`;

export default FilteredMap;
