import { CreateRawDataDto } from './dtos/create-raw-data.dto';
import { Telecom } from './schemas/telecom.schema';

export const mapRawDataToTelecom = (dto: CreateRawDataDto): Telecom => {
  const objectName: Telecom['objectName'] = {
    name: dto['Object Name']['name'],
    functionName: dto['Object Name']['functionName'],
    localCellId: dto['Object Name']['localCellId'],
    cellName: dto['Object Name']['cellName'],
    eNodeBId: dto['Object Name']['eNodeBId'],
    cellFddTddIndication: dto['Object Name']['cellFddTddIndication'],
  };

  return new Telecom({
    resultTime: dto['Result Time'],
    granularityPeriod: dto['Granularity Period'],
    objectName: objectName,
    reliability: dto['Reliability'],
    lCellAvailDur: dto['L.Cell.Avail.Dur'],
    lCellUnavailDurEnergySaving: dto['L.Cell.Unavail.Dur.EnergySaving'],
    lCellUnavailDurManual: dto['L.Cell.Unavail.Dur.Manual'],
    lCellUnavailDurSys: dto['L.Cell.Unavail.Dur.Sys'],
    lCellUnavailDurSysS1Fail: dto['L.Cell.Unavail.Dur.Sys.S1Fail'],
    lVoiceE2EVQIAcceptTimes: dto['L.Voice.E2EVQI.Accept.Times'],
    lVoiceE2EVQIBadTimes: dto['L.Voice.E2EVQI.Bad.Times'],
    lVoiceE2EVQIExcellentTimes: dto['L.Voice.E2EVQI.Excellent.Times'],
    lVoiceE2EVQIGoodTimes: dto['L.Voice.E2EVQI.Good.Times'],
    lVoiceE2EVQIPoorTimes: dto['L.Voice.E2EVQI.Poor.Times'],
  });
};
