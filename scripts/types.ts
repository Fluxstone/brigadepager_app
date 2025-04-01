export type Alarm = {
  id: string;
  message: string;
  time: string;
};

export type AlarmResponse = {
  id: string;
  alarmId: string;
  staffId: string;
  response: boolean;
  timeDate: string;
};

export type Authority = {
  username: string;
  authority: string;
};

//TODO: Remove password field
export type User = {
  authorities: Authority[];
  enabled: boolean;
  password: string;
  username: string;
};

export type CombinedAlarm = {
  id: string;
  message: string;
  time: string;
  positiveResponses: any[],
  negativeResponses: any[]
}

export type Staff = {
  id: string;
  firstName: string;
  lastName: string;
  credentialsId: string;
  brigadeId: string;
  certificationsId: string;
  admin: boolean;
};

export type Certification = {
  id: string;
  atemschutzGeraetetraeger: boolean;
  gruppenfuehrer: boolean;
  maschinist: boolean;
  sanitaeter: boolean;
  truppfuehrer: boolean;
  truppmann: boolean;
  zugfuehrer: boolean;
};

