import { trpc } from "../trpc"

export const tableConfigsFactory = (table: "Raynaud" | "AIN Compression") => {
    if (table === "Raynaud") {
        return RaynaudTableConfigs()
    }
}

const RaynaudTableConfigs = () => {
    const data = trpc.diagnosisData.getAllData.useQuery({
        diagnosis: "Raynaud",
    }).data

    const rowData = data
        ? data.map((item) => {
              return {
                  name: item.patient.name,
                  gender: item.patient.gender,
                  birthday: item.patient.birthday,
                  ...item.raynaudData,
              }
          })
        : []

    const columnDefs = [
        {
            headerName: "基本資料",
            children: [
                { field: "patientId", editable: false },
                { field: "name", columnGroupShow: "open", editable: false },
                {
                    field: "gender",
                    columnGroupShow: "open",
                    editable: false,
                },
                {
                    field: "birthday",
                    columnGroupShow: "open",
                    editable: false,
                },
            ],
        },
        {
            headerName: "疾病資料",
            children: [
                { field: "affectedSide" },
                {
                    headerName: "風險因子",
                    children: [
                        { field: "comorbidities" },
                        { field: "psychologicalDisorder" },
                        { field: "smoking" },
                        { field: "autoimmuneDzSince" },
                        { field: "raynaudSince" },
                    ],
                    columnGroupShow: "open",
                },
                {
                    headerName: "其它",
                    children: [
                        { field: "yearsFromAutoimmuneToOp" },
                        { field: "yearsFromRaynaudToOp" },
                        { field: "pastIntervention" },
                        { field: "oralVasodilatorTreatment" },
                        { field: "seasonal" },
                    ],
                    columnGroupShow: "open",
                },
            ],
        },
        {
            headerName: "手術資料",
            children: [
                { field: "surgeryDate" },
                {
                    headerName: "其它",
                    children: [
                        { field: "nailfoldCapillaryMicroscopy" },
                        { field: "nerveOfHenleDistanceToPisiform" },
                    ],
                    columnGroupShow: "open",
                },
                {
                    headerName: "ICG Data",
                    children: [
                        { field: "icgIngressBGPreOp" },
                        { field: "icgIngressBGPostOp" },
                        { field: "icgIngressRateBGPreOp" },
                        { field: "icgIngressRateBGPostOp" },
                        { field: "icgIngressImprovementBG" },
                        { field: "icgIngressRateImprovementBG" },
                        { field: "icgEgressBGPreOp" },
                        { field: "icgEgressBGPostOp" },
                        { field: "icgEgressRateBGPreOp" },
                        { field: "icgEgressRateBGPostOp" },
                        { field: "icgEgressImprovementBG" },
                        { field: "icgEgressRateImprovementBG" },
                        { field: "icgIngressBrightestAreaPreOp" },
                        { field: "icgIngressBrightestAreaPostOp" },
                        { field: "icgIngressRateBrightestAreaPreOp" },
                        { field: "icgIngressRateBrightestAreaPostOp" },
                        { field: "icgIngressImprovementBrightestArea" },
                        { field: "icgIngressRateImprovementBrightestArea" },
                        { field: "icgEgressBrightestAreaPreOp" },
                        { field: "icgEgressBrightestAreaPostOp" },
                        { field: "icgEgressRateBrightestAreaPreOp" },
                        { field: "icgEgressRateBrightestAreaPostOp" },
                        { field: "icgEgressImprovementBrightestArea" },
                        { field: "icgEgressRateImprovementBrightestArea" },
                        { field: "finger2ICGIngressPreOp" },
                        { field: "finger2ICGIngressPostOp" },
                        { field: "finger2ICGIngressRatePreOp" },
                        { field: "finger2ICGIngressRatePostOp" },
                        { field: "finger2ICGIngressImprovement" },
                        { field: "finger2ICGIngressRateImprovement" },
                        { field: "finger2ICGEgressPreOp" },
                        { field: "finger2ICGEgressPostOp" },
                        { field: "finger2ICGEgressRatePreOp" },
                        { field: "finger2ICGEgressRatePostOp" },
                        { field: "finger2ICGEgressImprovement" },
                        { field: "finger2ICGEgressRateImprovement" },
                        { field: "finger3ICGIngressPreOp" },
                        { field: "finger3ICGIngressPostOp" },
                        { field: "finger3ICGIngressRatePreOp" },
                        { field: "finger3ICGIngressRatePostOp" },
                        { field: "finger3ICGIngressImprovement" },
                        { field: "finger3ICGIngressRateImprovement" },
                        { field: "finger3ICGEgressPreOp" },
                        { field: "finger3ICGEgressPostOp" },
                        { field: "finger3ICGEgressRatePreOp" },
                        { field: "finger3ICGEgressRatePostOp" },
                        { field: "finger3ICGEgressImprovement" },
                        { field: "finger3ICGEgressRateImprovement" },
                        { field: "finger4ICGIngressPreOp" },
                        { field: "finger4ICGIngressPostOp" },
                        { field: "finger4ICGIngressRatePreOp" },
                        { field: "finger4ICGIngressRatePostOp" },
                        { field: "finger4ICGIngressImprovement" },
                        { field: "finger4ICGIngressRateImprovement" },
                        { field: "finger4ICGEgressPreOp" },
                        { field: "finger4ICGEgressPostOp" },
                        { field: "finger4ICGEgressRatePreOp" },
                        { field: "finger4ICGEgressRatePostOp" },
                        { field: "finger4ICGEgressImprovement" },
                        { field: "finger4ICGEgressRateImprovement" },
                    ],
                    columnGroupShow: "open",
                },
            ],
            columnGroupShow: "open",
        },
        {
            headerName: "追蹤資料",
            children: [
                { field: "postOPYear" },
                { field: "discoloration" },
                { field: "numbness" },
                { field: "pain" },
                { field: "digitalUlcerationPresence" },
                { field: "digitalUlcerationNumbers" },
                { field: "attackFrequency" },
                { field: "digitalSkinTemperature" },
                { field: "digitalSkinBloodFlow" },
                {
                    headerName: "問卷資料",
                    children: [
                        {
                            headerName: "Michigan",
                            children: [
                                { field: "MHOOverallR" },
                                { field: "MHOOverallL" },
                                { field: "MHOActivitiesROH" },
                                { field: "MHOActivitiesROverall" },
                                { field: "MHOActivitiesLOH" },
                                { field: "MHOActivitiesLOverall" },
                                { field: "MHOActivitiesTH" },
                                { field: "MHOWork" },
                                { field: "MHOPain" },
                                { field: "MHOAestheticsR" },
                                { field: "MHOAestheticsL" },
                                { field: "MHOSatisfactionR" },
                                { field: "MHOSatisfactionL" },
                            ],
                            columnGroupShow: "open",
                        },
                        {
                            headerName: "SF36",
                            children: [
                                { field: "SF36PhyFunc" },
                                { field: "SF36RolePhy" },
                                { field: "SF36BodyPain" },
                                { field: "SF36GenHealth" },
                                { field: "SF36Vitality" },
                                { field: "SF36SocialFunc" },
                                { field: "SF36RoleEmotion" },
                                { field: "SF36MentalHealth" },
                            ],
                            columnGroupShow: "open",
                        },
                    ],
                    columnGroupShow: "open",
                },
            ],
        },
    ]

    const rowIDGetter = (params: any) => {
        return `${params.data.id}${params.data.date}${params.data.postOPYear}`
    }

    const onGridReady = (event: any) => {
        const columnState = {
            // https://www.ag-grid.com/javascript-grid-column-state/#column-state-interface
            state: [
                {
                    colId: "patientId",
                    sort: "asc",
                },
                {
                    colId: "postOPYear",
                    sort: "asc",
                },
            ],
        }
        event.columnApi.applyColumnState(columnState)
    }

    return { rowData, columnDefs, rowIDGetter, onGridReady }
}
