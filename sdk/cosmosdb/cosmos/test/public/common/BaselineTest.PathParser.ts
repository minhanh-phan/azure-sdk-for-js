// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export default [
  {
    path: "/",
    parts: [],
  },
  {
    path: "/*",
    parts: ["*"],
  },
  {
    path: '/"Key1"/*',
    parts: ["Key1", "*"],
  },
  {
    path: '/"Key1"/"StringValue"/*',
    parts: ["Key1", "StringValue", "*"],
  },
  {
    path: "/'Key1'/'StringValue'/*",
    parts: ["Key1", "StringValue", "*"],
  },
  {
    path: "/'Ke\\\"\\\"y1'/'Strin\\\"gValue'/*",
    parts: ['Ke\\"\\"y1', 'Strin\\"gValue', "*"],
  },
  {
    path: '/\'Ke\\"\\"y1\'/"Strin\'gValue"/*',
    parts: ['Ke\\"\\"y1', "Strin'gValue", "*"],
  },
  {
    path: "/'Key1'/'StringValue'/*",
    parts: ["Key1", "StringValue", "*"],
  },
  {
    path: '/"Key1"/"Key2"/*',
    parts: ["Key1", "Key2", "*"],
  },
  {
    path: '/"Key1"/"Key2"/"Key3"/*',
    parts: ["Key1", "Key2", "Key3", "*"],
  },
  {
    path: '/"A"/"B"/"R"/[]/"Address"/[]/*',
    parts: ["A", "B", "R", "[]", "Address", "[]", "*"],
  },
  {
    path: '/"A"/"B"/"R"/[]/"Address"/[]/*',
    parts: ["A", "B", "R", "[]", "Address", "[]", "*"],
  },
  {
    path: '/"A"/"B"/"R"/[]/"Address"/*',
    parts: ["A", "B", "R", "[]", "Address", "*"],
  },
  {
    path: '/"Key1"/"Key2"/?',
    parts: ["Key1", "Key2", "?"],
  },
  {
    path: '/"Key1"/"Key2"/*',
    parts: ["Key1", "Key2", "*"],
  },
  {
    path: '/"123"/"StringValue"/*',
    parts: ["123", "StringValue", "*"],
  },
  {
    path: "/'!@#$%^&*()_+='/'StringValue'/*",
    parts: ["!@#$%^&*()_+=", "StringValue", "*"],
  },
  {
    path: '/"_ts"/?',
    parts: ["_ts", "?"],
  },
  {
    path: '/[]/"City"/*',
    parts: ["[]", "City", "*"],
  },
  {
    path: "/[]/*",
    parts: ["[]", "*"],
  },
  {
    path: '/[]/"fine!"/*',
    parts: ["[]", "fine!", "*"],
  },
  {
    path: '/"this is a long key with speicial characters (*)(*)__)((*&*(&*&\'*(&)()(*_)()(_(_)*!@#$%^ and numbers 132654890"/*',
    parts: [
      "this is a long key with speicial characters (*)(*)__)((*&*(&*&'*(&)()(*_)()(_(_)*!@#$%^ and numbers 132654890",
      "*",
    ],
  },
  {
    path: "/ Key 1 / Key 2 ",
    parts: ["Key 1", "Key 2"],
  },
];
