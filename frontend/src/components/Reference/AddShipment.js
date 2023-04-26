import { months } from "./Calendar-variables";

export function dateSplit(date) {
  const year = Number(date.slice(0, 4));
  const month = months[Number(date.slice(5, 7)) - 1];
  const day = Number(date.slice(8, 10));

  return { year: year, month: month, day: day };
}

export function addShipment(data, shipment) {
  let thisDay;
  if (shipment.type === "Import") {
    thisDay = dateSplit(shipment.eta);
  } else {
    thisDay = dateSplit(shipment.cutoff);
  }
  const [month, year, date] = [thisDay.month, thisDay.year, thisDay.day];
  if (data.length > 0) {
    const monthData = data.filter(
      (item) => item.month === month && item.year === year
    );
    if (monthData.length === 0) {
      data.push({
        month: month,
        year: year,
        shipments: [
          {
            date: date,
            values: [shipment],
          },
        ],
      });
    } else {
      const dateData = monthData[0].shipments.filter(
        (element) => element.date === date
      );

      if (dateData.length > 0) {
        dateData[0].values.push(shipment);
      } else {
        monthData[0].shipments.push({
          date: date,
          values: [shipment],
        });
      }
    }
  } else {
    data.push({
      month: month,
      year: year,
      shipments: [
        {
          date: date,
          values: [shipment],
        },
      ],
    });
  }
}

export function deleteShipment(data, shipment) {
  const thisDay = dateSplit(shipment.eta);
  const [year, month, date] = [thisDay.year, thisDay.month, thisDay.day];

  const thisMonthData = data.filter(
    (monthData) => monthData.month === month && monthData.year === year
  );

  const thisDayData = thisMonthData[0].shipments.filter(
    (dayData) => dayData.date === date
  );

  if (shipment.contType === "LCLFAK") {
    const currMasterDataIndex = thisDayData[0].values.findIndex(
      (thisData) => thisData.id === shipment.mId
    );

    const currMasterData = thisDayData[0].values[currMasterDataIndex];

    const currDataIndex = currMasterData.fakShipments.findIndex(
      (thisShipment) => thisShipment.id === shipment.id
    );
    currMasterData.fakShipments.splice(currDataIndex, currDataIndex + 1);
  } else {
    const currDataIndex = thisDayData[0].values.findIndex(
      (thisData) => thisData.id === shipment.id
    );

    thisDayData[0].values.splice(currDataIndex, currDataIndex + 1);
  }
}

export function editShipment(data, shipment) {
  const toAddShipment = shipment;
  let date;
  let prevDay;
  if (shipment.type === "Import") {
    date = dateSplit(shipment.eta);
    prevDay = dateSplit(shipment.prevEta.current);
  } else {
    date = dateSplit(shipment.cutoff);
    prevDay = dateSplit(shipment.prevCutoff.current);
  }
  const day = date.day;

  const [prevYear, prevMonth, prevDate] = [
    prevDay.year,
    prevDay.month,
    prevDay.day,
  ];

  const thisMonthData = data.filter(
    (monthData) => monthData.month === prevMonth && monthData.year === prevYear
  );

  if (shipment.contType === "LCLFAK") {
    const thisDayData = thisMonthData[0].shipments.filter(
      (dayData) => dayData.date === day
    );

    const currMasterData = thisDayData[0].values.filter(
      (thisData) => thisData.id === shipment.mId
    );
    const currDataIndex = currMasterData[0].fakShipments.findIndex(
      (thisShipment) => thisShipment.id === shipment.id
    );

    currMasterData[0].fakShipments[currDataIndex] = shipment;
  } else {
    const thisDayData = thisMonthData[0].shipments.filter(
      (dayData) => dayData.date === prevDate
    );

    const currDataIndex = thisDayData[0].values.findIndex(
      (thisData) => thisData.id === shipment.id
    );

    thisDayData[0].values.splice(currDataIndex, currDataIndex + 1);

    addShipment(data, toAddShipment);
  }
}

// [{an: {
//   isAn: anState,
//   anDone: props.data.an.anDone,
//   anDate: props.data.an.anDate,
// },
// inv: {
//   isInv: invState,
//   invDone: props.data.inv.invDone,
//   invDate: props.data.inv.invDate,
// },
// cclr: {
//   isCclr: cclrState,
//   cclrDone: props.data.cclr.cclrDone,
//   cclrDate: props.data.cclr.cclrDate,
// },
// del: {
//   isDel: delState,
//   delDone: props.data.del.delDone,
//   delDate: props.data.del.delDate,
// },
// str: {
//   isStr: strState,
//   strStarted: props.data.str.strStarted,
//   strDone: props.data.str.strDone,
//   strDateStart: props.data.str.strDateStart,
//   strDateEnd: props.data.str.strDateEnd,
// }}]

export function saveChecklist(data, shipment) {
  let thisDay;
  if (shipment.type === "Import") {
    thisDay = dateSplit(shipment.eta);
  } else {
    thisDay = dateSplit(shipment.cutoff);
  }

  const [year, month, date] = [thisDay.year, thisDay.month, thisDay.day];

  let currData;

  const thisMonthData = data.filter(
    (monthData) => monthData.month === month && monthData.year === year
  );

  const thisDayData = thisMonthData[0].shipments.filter(
    (dayData) => dayData.date === date
  );

  if (shipment.contType === "LCLFAK") {
    const currMasterDataIndex = thisDayData[0].values.findIndex(
      (thisData) => thisData.id === shipment.mId
    );
    const currMasterData = thisDayData[0].values[currMasterDataIndex];
    const currDataIndex = currMasterData.fakShipments.findIndex(
      (thisShipment) => thisShipment.id === shipment.id
    );
    currData = currMasterData.fakShipments[currDataIndex];
  } else {
    const currDataIndex = thisDayData[0].values.findIndex(
      (thisData) => thisData.id === shipment.id
    );
    currData = thisDayData[0].values[currDataIndex];
  }

  if (shipment.type === "Import") {
    [
      currData.an.isAn,
      currData.an.anDone,
      currData.an.anDate,
      currData.inv.isInv,
      currData.inv.invDone,
      currData.inv.invDate,
      currData.do.isDo,
      currData.do.doDone,
      currData.do.doDate,
      currData.outturn.isoutturn,
      currData.outturn.outturnDone,
      currData.outturn.outturnDate,
      currData.cclr.isCclr,
      currData.cclr.cclrDone,
      currData.cclr.cclrDate,
      currData.del.isDel,
      currData.del.delDone,
      currData.del.delDate,
      currData.str.isStr,
      currData.str.strStarted,
      currData.str.strDone,
      currData.str.strDateStart,
      currData.str.strDateEnd,
      currData.mbl.isMblSurr,
      currData.hbl.isHblSurr,
    ] = [
      shipment.an.isAn,
      shipment.an.anDone,
      shipment.an.anDate,
      shipment.inv.isInv,
      shipment.inv.invDone,
      shipment.inv.invDate,
      shipment.do.isDo,
      shipment.do.doDone,
      shipment.do.doDate,
      shipment.outturn.isoutturn,
      shipment.outturn.outturnDone,
      shipment.outturn.outturnDate,
      shipment.cclr.isCclr,
      shipment.cclr.cclrDone,
      shipment.cclr.cclrDate,
      shipment.del.isDel,
      shipment.del.delDone,
      shipment.del.delDate,
      shipment.str.isStr,
      shipment.str.strStarted,
      shipment.str.strDone,
      shipment.str.strDateStart,
      shipment.str.strDateEnd,
      shipment.mbl.isMblSurr,
      shipment.hbl.isHblSurr,
    ];
  } else {
    [
      currData.bc.isBc,
      currData.bc.bcDone,
      currData.bc.bcDate,
      currData.inv.isInv,
      currData.inv.invDone,
      currData.inv.invDate,
      currData.bl.isBl,
      currData.bl.blDone,
      currData.bl.blDate,
      currData.checkIn.isCheckIn,
      currData.checkIn.checkInDone,
      currData.checkIn.checkInDate,
      currData.cclr.isCclr,
      currData.cclr.cclrDone,
      currData.cclr.cclrDate,
      currData.del.isDel,
      currData.del.delDone,
      currData.del.delDate,
      currData.str.isStr,
      currData.str.strStarted,
      currData.str.strDone,
      currData.str.strDateStart,
      currData.str.strDateEnd,
      currData.mbl.isMblSurr,
      currData.hbl.isHblSurr,
    ] = [
      shipment.bc.isBc,
      shipment.bc.bcDone,
      shipment.bc.bcDate,
      shipment.inv.isInv,
      shipment.inv.invDone,
      shipment.inv.invDate,
      shipment.bl.isBl,
      shipment.bl.blDone,
      shipment.bl.blDate,
      shipment.checkIn.isCheckIn,
      shipment.checkIn.checkInDone,
      shipment.checkIn.checkInDate,
      shipment.cclr.isCclr,
      shipment.cclr.cclrDone,
      shipment.cclr.cclrDate,
      shipment.del.isDel,
      shipment.del.delDone,
      shipment.del.delDate,
      shipment.str.isStr,
      shipment.str.strStarted,
      shipment.str.strDone,
      shipment.str.strDateStart,
      shipment.str.strDateEnd,
      shipment.mbl.isMblSurr,
      shipment.hbl.isHblSurr,
    ];
  }
}

export function makeShipment(event, shipmentType, contType) {
  let [mbl, hbl, stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven] = ["", "", "", "", "", "", "", "", ""];

  if (contType === "FAK") {
    mbl = event.target.mbl.value;
    hbl = "";
    stepOne = false;
    stepTwo = false;
    stepThree = false;
    stepFour = false;
    stepFive = false;
    stepSix = false;
    stepSeven = false;
  } else if (contType === "BKR") {
    mbl = "";
    hbl = event.target.hbl.value;
    stepOne = event.target.stepOne.checked;
    stepTwo = event.target.stepTwo.checked;
    stepThree = event.target.stepThree.checked;
    stepFour = event.target.stepFour.checked;
    stepFive = event.target.stepFive.checked;
    stepSix = event.target.stepSix.checked;
    stepSeven = event.target.stepSeven.checked;
  } else {
    mbl = event.target.mbl.value;
    hbl = event.target.hbl.value;
    stepOne = event.target.stepOne.checked;
    stepTwo = event.target.stepTwo.checked;
    stepThree = event.target.stepThree.checked;
    stepFour = event.target.stepFour.checked;
    stepFive = event.target.stepFive.checked;
    stepSix = event.target.stepSix.checked;
    stepSeven = event.target.stepSeven.checked;
  }
  return {
    ref: event.target.ref.value,
    cargoType: shipmentType,
    contType: contType,
    schedule: event.target.schedule.value,
    port: event.target.port.value,
    vessel: event.target.vessel.value.toUpperCase(),
    voyage: event.target.voyage.value.toUpperCase(),
    container: event.target.container.value.toUpperCase(),
    depot: event.target.depot.value,
    notes: event.target.notes.value,
    fakShipments: [],
    mblNumber: mbl,
    hblNumber: hbl,
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    stepFour: stepFour,
    stepFive: stepFive,
    stepSix: stepSix,
    stepSeven: stepSeven,
  };
}

export function makeShipmentForChecklist(data, event, state) {
  if (state.isHblSurr && !data.hbl.isHblSurr) {
    const newHblNote = "\n\nHBL Surrendered: " + state.hblSurrDate;
    data.notes += newHblNote;
  }

  if (!state.isHblSurr && data.hbl.isHblSurr) {
    const initHblNote = "\n\nHBL Surrendered: " + state.hblSurrDate;
    data.notes = data.notes.replace(initHblNote, "");
  }

  if (state.isMblSurr && !data.mbl.isMblSurr) {
    const newMblNote = "\n\nMBL Surrendered: " + state.mblSurrDate;
    data.notes += newMblNote;
  }

  if (!state.isMblSurr && data.mbl.isMblSurr) {
    const initMblNote = "\n\nMBL Surrendered: " + state.mblSurrDate;
    data.notes = data.notes.replace(initMblNote, "");
  }

  let mId;
  if (data.mId) {
    mId = data.mId;
  } else {
    mId = "";
  }

  let shipment;
  if (data.type === "Import") {
    shipment = {
      id: data.id,
      mId: mId,
      type: data.type,
      contType: data.contType,
      eta: data.eta,
      prevEta: data.prevEta,
      pod: data.pod,
      vessel: data.vessel,
      voyage: data.voyage,
      mbl: {
        number: data.mbl.number,
        isMblSurr: state.isMblSurr,
        surrDate: state.mblSurrDate,
      },
      hbl: {
        number: data.hbl.number,
        isHblSurr: state.isHblSurr,
        surrDate: state.hblSurrDate,
      },
      container: data.container,
      depot: data.depot,
      notes: data.notes,
      an: {
        isAn: data.an.isAn,
        anDone: state.isAn,
        anDate: state.anValue,
      },
      inv: {
        isInv: data.inv.isInv,
        invDone: state.isInv,
        invDate: state.invValue,
      },
      do: {
        isDo: data.do.isDo,
        doDone: state.isDo,
        doDate: state.doValue,
      },
      outturn: {
        isOutturn: data.outturn.isOutturn,
        outturnDone: state.isOutturn,
        outturnDate: state.outturnValue,
      },
      cclr: {
        isCclr: data.cclr.isCclr,
        cclrDone: state.isCclr,
        cclrDate: state.cclrValue,
      },
      del: {
        isDel: data.del.isDel,
        delDone: state.isDel,
        delDate: state.delValue,
      },
      str: {
        isStr: data.str.isStr,
        strStarted: state.isStrStart,
        strDone: state.isStrEnd,
        strDateStart: state.strStartValue,
        strDateEnd: state.strEndValue,
      },
    };
  } else {
    shipment = {
      id: data.id,
      mId: mId,
      type: data.type,
      contType: data.contType,
      cutoff: data.cutoff,
      prevCutoff: data.prevCutoff,
      pol: data.pol,
      vessel: data.vessel,
      voyage: data.voyage,
      mbl: {
        number: data.mbl.number,
        isMblSurr: state.isMblSurr,
        surrDate: state.mblSurrDate,
      },
      hbl: {
        number: data.hbl.number,
        isHblSurr: state.isHblSurr,
        surrDate: state.hblSurrDate,
      },
      container: data.container,
      depot: data.depot,
      notes: data.notes,
      bc: {
        isBc: data.bc.isBc,
        bcDone: state.isBc,
        bcDate: state.bcValue,
      },
      inv: {
        isInv: data.inv.isInv,
        invDone: state.isInv,
        invDate: state.invValue,
      },
      bl: {
        isBl: data.bl.isBl,
        blDone: state.isBl,
        blDate: state.blValue,
      },
      checkIn: {
        isCheckIn: data.checkIn.isCheckIn,
        checkInDone: state.isCheckIn,
        checkInDate: state.checkInValue,
      },
      cclr: {
        isCclr: data.cclr.isCclr,
        cclrDone: state.isCclr,
        cclrDate: state.cclrValue,
      },
      del: {
        isDel: data.del.isDel,
        delDone: state.isDel,
        delDate: state.delValue,
      },
      str: {
        isStr: data.str.isStr,
        strStarted: state.isStrStart,
        strDone: state.isStrEnd,
        strDateStart: state.strStartValue,
        strDateEnd: state.strEndValue,
      },
    };
  }

  return shipment;
}
