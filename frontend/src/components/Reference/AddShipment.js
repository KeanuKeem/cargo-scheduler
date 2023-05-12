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

export function makeEditShipment(
  ref,
  contType,
  schedule,
  prevSchedule,
  port,
  vessel,
  voyage,
  mbl,
  hbl,
  cont,
  depot,
  notes,
  fakShipments,
  one,
  two,
  three,
  four,
  five,
  six,
  seven
) {
  if (contType === "FAK") {
    return {
      ref,
      contType,
      schedule,
      prevSchedule,
      port,
      vessel,
      voyage,
      mbl: {
        number: mbl,
      },
      container: cont,
      depot,
      notes,
      fakShipments,
      stepOne: {
        isHandle: one,
      },
      stepTwo: {
        isHandle: two,
      },
      stepThree: {
        isHandle: three,
      },
      stepFour: {
        isHandle: four,
      },
      stepFive: {
        isHandle: five,
      },
      stepSix: {
        isHandle: six,
      },
      stepSeven: {
        isHandle: seven,
      },
    };
  } else if (contType === "AIR") {
    return {
      ref,
      contType,
      schedule,
      prevSchedule,
      port,
      vessel,
      mbl: {
        number: mbl,
      },
      hbl: {
        number: hbl,
      },
      depot,
      notes,
      stepOne: {
        isHandle: one,
      },
      stepTwo: {
        isHandle: two,
      },
      stepThree: {
        isHandle: three,
      },
      stepFour: {
        isHandle: four,
      },
      stepFive: {
        isHandle: five,
      },
      stepSix: {
        isHandle: six,
      },
      stepSeven: {
        isHandle: seven,
      },
    };
  } else if (contType === "BKR") {
    return {
      ref,
      contType,
      schedule,
      prevSchedule,
      port,
      vessel,
      voyage,
      hbl: {
        number: hbl,
      },
      container: cont,
      depot,
      notes,
      stepOne: {
        isHandle: one,
      },
      stepTwo: {
        isHandle: two,
      },
      stepThree: {
        isHandle: three,
      },
      stepFour: {
        isHandle: four,
      },
      stepFive: {
        isHandle: five,
      },
      stepSix: {
        isHandle: six,
      },
      stepSeven: {
        isHandle: seven,
      },
    };
  } else {
    return {
      ref,
      contType,
      schedule,
      prevSchedule,
      port,
      vessel,
      voyage,
      mbl: {
        number: mbl,
      },
      hbl: {
        number: hbl,
      },
      container: cont,
      depot,
      notes,
      stepOne: {
        isHandle: one,
      },
      stepTwo: {
        isHandle: two,
      },
      stepThree: {
        isHandle: three,
      },
      stepFour: {
        isHandle: four,
      },
      stepFive: {
        isHandle: five,
      },
      stepSix: {
        isHandle: six,
      },
      stepSeven: {
        isHandle: seven,
      },
    };
  }
}

export function makeChecklist(ref, contType, checklistState, favourite) {
  if (contType === "FAK") {
    return {
      ref,
      contType,
      isMblSurr: checklistState.isMblSurr,
      mblSurrDate: checklistState.mblSurrDate,
      favourite,
      isHold: checklistState.isHold
    }
  }
  return {
    ref,
    contType,
    isMblSurr: checklistState.isMblSurr,
    mblSurrDate: checklistState.mblSurrDate,
    isHblSurr: checklistState.isHblSurr,
    hblSurrDate: checklistState.hblSurrDate,
    isStepOneDone: checklistState.isStepOneDone,
    stepOneValue: checklistState.stepOneValue,
    isStepTwoDone: checklistState.isStepTwoDone,
    stepTwoValue: checklistState.stepTwoValue,
    isStepThreeDone: checklistState.isStepThreeDone,
    stepThreeValue: checklistState.stepThreeValue,
    isStepFourDone: checklistState.isStepFourDone,
    stepFourValue: checklistState.stepFourValue,
    isStepFiveDone: checklistState.isStepFiveDone,
    stepFiveValue: checklistState.stepFiveValue,
    isStepSixDone: checklistState.isStepSixDone,
    stepSixValue: checklistState.stepSixValue,
    isStepSevenStart: checklistState.isStepSevenStart,
    stepSevenStartValue: checklistState.stepSevenStartValue,
    isStepSevenEnd: checklistState.isStepSevenEnd,
    stepSevenEndValue: checklistState.stepSevenEndValue,
    favourite,
    isHold: checklistState.isHold
  };
}

export function makeShipment(event, shipmentType, contType) {
  if (contType === "FAK") {
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
      mblNumber: event.target.mbl.value,
    };
  } else if (contType === "BKR") {
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
      hblNumber: event.target.hbl.value,
      stepOne: event.target.stepOne.checked,
      stepTwo: event.target.stepTwo.checked,
      stepThree: event.target.stepThree.checked,
      stepFour: event.target.stepFour.checked,
      stepFive: event.target.stepFive.checked,
      stepSix: event.target.stepSix.checked,
      stepSeven: event.target.stepSeven.checked,
    };
  } else if (contType === "AIR") {
    let mbl = "";
    if (event.target.mbl.value !== undefined) {
      mbl = event.target.mbl.value;
    }
    return {
      ref: event.target.ref.value,
      cargoType: shipmentType,
      contType: contType,
      schedule: event.target.schedule.value,
      port: event.target.port.value,
      vessel: event.target.vessel.value.toUpperCase(),
      depot: event.target.depot.value,
      notes: event.target.notes.value,
      mblNumber: mbl,
      hblNumber: event.target.hbl.value,
      stepOne: event.target.stepOne.checked,
      stepTwo: event.target.stepTwo.checked,
      stepThree: event.target.stepThree.checked,
      stepFour: event.target.stepFour.checked,
      stepFive: event.target.stepFive.checked,
      stepSix: event.target.stepSix.checked,
      stepSeven: event.target.stepSeven.checked,
    };
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
    mblNumber: event.target.mbl.value,
    hblNumber: event.target.hbl.value,
    stepOne: event.target.stepOne.checked,
    stepTwo: event.target.stepTwo.checked,
    stepThree: event.target.stepThree.checked,
    stepFour: event.target.stepFour.checked,
    stepFive: event.target.stepFive.checked,
    stepSix: event.target.stepSix.checked,
    stepSeven: event.target.stepSeven.checked,
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
