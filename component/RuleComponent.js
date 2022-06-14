import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = sdkKey;

const RuleComponent = ({ experimentKey, projectId, flagKey, name, enabled}) => {

  const [reportData, setReportData] = useState([]);
  const router = useRouter();

  const disableExperiment = (featureKey, experimentKey, router) => {
    axios.patch(`https://api.optimizely.com/flags/v1/projects/${projectId}/flags/${featureKey}/environments/production/ruleset`, [{
      "op": "replace",
      "path": `/rules/${experimentKey}/enabled`,
      "value": false
    }])
    .then(() => router.reload(window.location.pathname))
    .catch(ex =>
      console.log("Create experiment issue", ex)
    )
  }

  const enableExperiment = (featureKey, experimentKey, router) => {
    axios.patch(`https://api.optimizely.com/flags/v1/projects/${projectId}/flags/${featureKey}/environments/production/ruleset`, [{
      "op": "replace",
      "path": `/rules/${experimentKey}/enabled`,
      "value": true
    }])
    .then(() => router.reload(window.location.pathname))
    .catch(ex =>
      console.log("Create experiment issue", ex)
    )
  }

  useEffect(() => {

    const fetchData = async () => {

      let tempData = [];

      axios.get(`https://api.optimizely.com/flags/v1/projects/${projectId}/environments/production/reports`)
        .then((response) => {
          const item = response?.data?.items?.find(item => item.rule_key === experimentKey);

          if (item) {

            const newUrl = item.fetch_results_api_url.replace("p13n-results-api.optimizely.com", "api.optimizely.com/v2");

            axios.get(newUrl)
              .then((response) => {
                const data = response.data;

                tempData.push(`confidence_threshold=${data.confidence_threshold}`);

                data.metrics?.map(metric => {
                  Object.keys(metric.results).forEach(key => {

                    Object.keys(metric.results[key]).forEach(subKey => {
                      tempData.push(`${subKey}=${metric.results[key][subKey]}`);
                    });
                  })
                })
            }).catch(ex =>
              console.log("Failed to get results data for experiment", ex)
            )
            .finally(() => {

              console.log(tempData);
              if (tempData?.length > 0)
              {
                setReportData(tempData)
              }
            })
          }

          return tempData;
        })
        .catch(ex =>
          console.log("Failed to get result data fore feature", ex)
        )
    }

    fetchData()
      .catch(console.error);

  },[]);

  return (
    <>
    <th>{name}</th>
    <td>{`${enabled}`}</td>
    <td>{reportData?.map((x, index) => <div key={index}>{x}</div>)}</td>
    <td><button onClick={() => enableExperiment(flagKey, experimentKey, router)}>
          Enable
      </button>
    </td>
    <td>
      <button onClick={() => disableExperiment(flagKey, experimentKey, router)}>
          Disable
      </button>
    </td>
    </>);
};

export default RuleComponent;