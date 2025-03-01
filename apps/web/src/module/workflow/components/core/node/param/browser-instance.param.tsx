'use client';

import React from 'react';
import { ParamProps } from 'src/module/workflow/types/app-node';

export default function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}
