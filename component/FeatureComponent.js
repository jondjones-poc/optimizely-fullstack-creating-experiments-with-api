import React from "react";
import { useRouter } from 'next/router'
import RulesComponent from './RuleComponent';

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = sdkKey;

const FeatureComponent = ({ rulesData, projectId, flagKey}) => {

  return (
    <>
      {rulesData?.map(({ key, name, enabled}, index) =>
        <tr key={index}>
          <RulesComponent
                        experimentKey={key}
                        rulesData={rulesData}
                        flagKey={flagKey}
                        projectId={projectId}
                        enabled={enabled}
                        name={name} />
        </tr> )}
    </>
);
}

export default FeatureComponent;