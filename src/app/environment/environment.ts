// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    rootApiUrl : 'http://192.168.10.11:84/',  // VM : TestManager Release Manager Dev API
    // rootApiUrl : 'http://localhost:5168/',  
    vendorApi: 'api/vendor',
    candidateApi: 'api/candidate',
    dashboardApi:'api/candidate',
    Griddata:'api/Candidate/CandidateDetails',
    skillApi:'api/skill',
    UserApi:'api/users'
  };
  
  
  