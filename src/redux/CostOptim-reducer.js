import { stopSubmit } from "redux-form";
import { authAPI, usersAPI, rolesAPI } from "../api/api";

const COST_OPTIM_ROUTE_VALUE = "COST_OPTIM_ROUTE_VALUE";

let initialState = {
  geocoder: null,
  router: null,
  markerGroup: null,
  group: null,
  map: null,
  UI: null,
    trStartRouteDate: false,
    dateNow: "",
    time: "",
    serverURL: "https://fleet.ls.hereapi.com/2/calculateroute.json?",
    routeButton: "Высчитать оптимальную стоимость маршрута",
    startValue: "am Kronberger Hang 8, Schwalbach",
    DestinationValue: "Frankfurt am Main",
    costPerHour: "50",
    costPerKm: "300",
    currency: "RUB",
    routerParamsState: " ",
    routerParamsValueState: "",
    nrOfTotalTires: "4",
    nrOfAxlesVehicle: "2",
    nrOfAxlesTrailer: "0",
    vehHeight: "167",
    trailerHeight: "0",
    vehWeight: "1739",
    totalWeight: "1739",
    totalLength: "441",
    totalWidth: "180",
    nrPassengers: "2",
    heightAbove1stAxle: "100",
    trailerNr: "0",
    emissionType: "5",
    routeAlternatives: "1",
    predefinedVehSpec: "0",
    vehicles: "2",
    trailerType: "0",
    hybrid: "0",
    disabledEquipped: "0",
    minPollution: "0",
    hov: "0",
    commercial: "0",
    hazardousType: "0",
    fuelType: "petrol",

    start: null,
    dest: null,
    mapReleaseTxt: null,
    pos: null,
    address: null,
    line1: null,
    line: null,
    //helper releaseGeocoderShown /releaseRoutingShown
    releaseGeocoderShown: false,
    releaseRoutingShown: false, 
    //  vehicles: null,
    pointA: null,
    pointB: null,
    startMarker: null,
    destMarker: null,
    routeLinkHashMap: new Object(), // key = linkID, value = link object
    routerMapRelease: null,
    release: null,
    currentBubble: null,
    currentOpenBubble: null,
    bErrorHappened: false,
    bLongClickUseForStartPoint: true, // for long click in map we toggle start/destination
    BLCUSP: null, // for long click in map we toggle start/destination
    routeColor: [
      "rgba(18, 65, 145, 0.8)",
      "rgba(0, 145, 255, 0.7)",
      "rgba(127, 201, 255, 0.6)",
    ],
    ppType_A_Color: [
      "rgba(255, 255, 0, 0.8)",
      "rgba(255, 255, 0, 0.7)",
      "rgba(255, 255, 0, 0.6)",
    ],
    ppType_a_Color: [
      "rgba(255, 216, 0, 0.8)",
      "rgba(255, 216, 0, 0.7)",
      "rgba(255, 216, 0, 0.6)",
    ],
    ppType_S_Color: [
      "rgba(255, 0, 0, 0.8)",
      "rgba(255, 0, 0, 0.7)",
      "rgba(255, 0, 0, 0.6)",
    ],
    ppType_p_Color: [
      "rgba(255, 127, 127, 0.8)",
      "rgba(255, 127, 127, 0.7)",
      "rgba(255, 127, 127, 0.6)",
    ],
    ppType_F_Color: [
      "rgba(214, 127, 255, 0.8)",
      "rgba(214, 127, 255, 0.7)",
      "rgba(214, 127, 255, 0.6)",
    ],
    ppType_K_Color: [
      "rgba(178, 0, 255, 0.8)",
      "rgba(178, 0, 255, 0.7)",
      "rgba(178, 0, 255, 0.6)",
    ],
    ppType_U_Color: [
      "rgba(0, 204, 0, 0.8)",
      "rgba(0, 204, 0, 0.7)",
      "rgba(0, 204, 0, 0.6)",
    ],
    tollCostStroke: 8,
    routeStroke: 8,
    strRoutingRequestSend: "Отправлен запрос на маршрутизацию. Ожидание ответа...",
    strTceRequestSend:
      "Запрос на оплату проезда по маршруту отправлен и зарегистрирован. Ожидание ответа...",
    strTceError:
      "При расчете стоимости проезда произошла ошибка. Пожалуйста, проверьте спецификацию транспортного средства. Номер прицепа установлен, но нет типа прицепа.",
    strTceResponseReceived: "Получил ответ. Обрабатываю его сейчас.",

    noCostOptimizationJustCalculate: false,
    svgMarkerImage_Line:`<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
    <rect id="label-box" ry="3" rx="3" stroke="#000000" height="30" width="__width__" y="11" x="45" fill="#ffffff"/>
    <text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="10" font-weight="bold" y="24" x="55" stroke-width="0" fill="#000000">__line1__</text>
    <text id="label-desc" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="8" y="36" x="55" stroke-width="0" fill="#000000">__line2__</text>
    <image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />
    </g>
    </svg>`,
  svgMarkerBase64Image:'<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
    '<g>' +
    '<image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />'+
    '</g>'+
    '</svg>',
  
   svgMarkerImageTransit: '<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
    '<g>' +
    '<image width="45" height="45" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />'+
    '</g>'+
    '</svg>',
    
   svgMarkerPublicTransit: '<svg  width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
    '<image width="20" height="20" xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSJibGFja19ibHVlIiBkPSJNNC42ODkgOWgtLjcyVjUuMTgyYzAtLjUuNjc4LTEuMjI5IDEuMTgtMS4yMjlsMi40ODgtLjAxNWMuMzU5LTEuMDQ1Ljc0My0xLjI4IDIuMTM2LTEuMjhoMi4zNTFDMTEuODA5IDIuMTE2IDExLjE1MyAyIDEwLjQ4NSAySDUuMDI5Yy0xIDAtMi4wMTcuODE0LTIuMDE3IDEuODE1di45NzhsLS4yNDUuMDZjLS4yNSAwLS43MDUuMjA0LS43MDUuNDU0djEuMTk0YzAgLjI1MS40MDMuNDAzLjY1My40MDNsLjI5Ny4wNjF2NC45NDRjMCAuNjIzLjYxLjU2MyAxLjAxOS43MTN2Ljk5MmMwIC4yNS4zNTYuMzU1LjM1Ni4zNTVoLjk2OWEuNDU1LjQ1NSAwIDAgMCAuNDU0LS40NTV2LS41MzdIN1Y5SDQuNjg5em0uODE5IDIuMjg3YS43OS43OSAwIDEgMS0uMDAyLTEuNTguNzkuNzkgMCAwIDEgLjAwMiAxLjU4eiIvPjxwYXRoIGQ9Ik0xNS45NjkgMTd2LS45OTdoLS45MDdWMTdoLTQuMDkzdi0uOTk3SDEwVjE3aC0uOTg3di45MjZoNy45NTZWMTd6bS4yNjctMTIuOTc5aC02LjE4Yy0uOTY3IDAtMi4wMjcgMS4wNTEtMi4wMjcgMi4wMTl2Ny42MTRjMCAuNzI2Ljc3MSAxLjMyIDEuNDk3IDEuMzJoNy4wNDJjLjcyNSAwIDEuNDE0LS41OTUgMS40MTQtMS4zMlY2LjA0YzAtLjk2OC0uNzc3LTIuMDE5LTEuNzQ2LTIuMDE5ek0xMC4wMSA1LjMyM2MwLS4xODMuMTAxLS4zMzEuMjIyLS4zMzFoNS41Yy4xMTkgMCAuMjIuMTc0LjIyLjM1NXYuMzQ4YzAgLjE4MS0uMTAxLjMyOS0uMjIuMzI5aC01LjVjLS4xMjEgMC0uMjIyLS4xNDgtLjIyMi0uMzI5di0uMzcyem0tLjQ5MSA3Ljk4OGEuODA1LjgwNSAwIDAgMS0uODA0LS44MDIuODA1LjgwNSAwIDAgMSAxLjYwOCAwIC44MDMuODAzIDAgMCAxLS44MDQuODAyem02Ljk3OSAwYS44MDUuODA1IDAgMCAxLS44MDQtLjgwMi44MDUuODA1IDAgMCAxIDEuNjA4IDAgLjgwMi44MDIgMCAwIDEtLjgwNC44MDJ6bS41MTUtMi4yNzZIOC45NjV2LTQuMDRoOC4wNDh2NC4wNHoiIGZpbGw9ImJsYWNrX2JsdWUiLz48L3N2Zz4=" />'+
    '</svg>',
  ResponseResult: null,
  HTML: [],
  
};

const costOptimRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case COST_OPTIM_ROUTE_VALUE:
    // let { field,value}= action.payload;
        // console.log(action)
      return {
        ...state,
        // ...action.payload
        [action.payload.field]: action.payload.value
            
        // [field]: value
      };


    default:
      return state;
  }
};

export const getcostOptimRouteValue = ( field, value) => ({
  type: COST_OPTIM_ROUTE_VALUE,
    // payload: {[field]: value}
   payload: {
     field,
     value
   } 
});


// export const requestDrivers = (field2, value2) => {
//     return (dispatch) => {
//     // dispatch(ToggleIsFetching(true));
//           dispatch(getDriversSuccess(items));
//   }
// }

export default costOptimRouteReducer;
