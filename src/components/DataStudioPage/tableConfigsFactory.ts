import { useState, useCallback } from "react"
import { trpc } from "../trpc"
import type { GetContextMenuItemsParams } from "ag-grid-enterprise"

export const tableConfigsFactory = (table: "Raynaud" | "AIN Compression") => {
    if (table === "Raynaud") {
        return useRaynaudTableConfigs()
    }
    if (table === "AIN Compression") {
        return AINTableConfigs()
    }
}

function getAge(dateString: string) {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

const useRaynaudTableConfigs = () => {
    const diagnosis = "Raynaud"
    const data = trpc.diagnosisData.getAllData.useQuery({
        diagnosis,
    }).data
    const refetch = trpc.diagnosisData.getAllData.useQuery({
        diagnosis,
    }).refetch

    const addData = trpc.diagnosisData.addData.useMutation().mutateAsync
    const saveData = trpc.diagnosisData.setData.useMutation().mutateAsync
    const deleteData = trpc.diagnosisData.deleteData.useMutation().mutateAsync
    // const questionnaireDataGetter =
    //     trpc.questionnaire.responseByPatient.useQuery

    const rowData = data
        ? data.map((item) => {
              return {
                  name: item.patient.name,
                  gender: item.patient.gender,
                  birthday: item.patient.birthday,
                  age: getAge(item.patient.birthday),
                  ...item.raynaudData,
                  MHOData: item.michiganHandOutcomeResponse,
                  SF36Data: item.sf36Response,
              }
          })
        : []

    const columnDefs = [
        {
            headerName: "基本資料",
            children: [
                { field: "patientId", editable: false, pinned: "left" },
                { field: "name", editable: false, pinned: "left" },
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
                {
                    field: "age",
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
                { field: "postOPYear", pinned: "left" },
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
                                { field: "MHOOverallR", editable: false },
                                { field: "MHOOverallL", editable: false },
                                { field: "MHOActivitiesROH", editable: false },
                                {
                                    field: "MHOActivitiesROverall",
                                    editable: false,
                                },
                                { field: "MHOActivitiesLOH", editable: false },
                                {
                                    field: "MHOActivitiesLOverall",
                                    editable: false,
                                },
                                { field: "MHOActivitiesTH", editable: false },
                                { field: "MHOWork", editable: false },
                                { field: "MHOPain", editable: false },
                                { field: "MHOAestheticsR", editable: false },
                                { field: "MHOAestheticsL", editable: false },
                                { field: "MHOSatisfactionR", editable: false },
                                { field: "MHOSatisfactionL", editable: false },
                            ],
                            columnGroupShow: "open",
                        },
                        {
                            headerName: "SF36",
                            children: [
                                { field: "SF36PhyFunc", editable: false },
                                { field: "SF36RolePhy", editable: false },
                                { field: "SF36BodyPain", editable: false },
                                { field: "SF36GenHealth", editable: false },
                                { field: "SF36Vitality", editable: false },
                                { field: "SF36SocialFunc", editable: false },
                                { field: "SF36RoleEmotion", editable: false },
                                { field: "SF36MentalHealth", editable: false },
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

    const getContextMenuItems = (params: GetContextMenuItemsParams) => {
        if (!params.node) {
            return ["export"]
        }

        const patientId = Number(params.node.data.patientId)

        let items = [
            "cut",
            "copy",
            "copyWithHeaders",
            "copyWithGroupHeaders",
            "paste",
            "separator",
            {
                name: "新增資料",
                action: async () => {
                    if (!params.node) return

                    await addData({
                        diagnosis,
                        patientId,
                    })
                    await refetch()
                },
            },
            {
                name: "刪除資料",
                action: async () => {
                    if (!params.node) return

                    await deleteData({
                        diagnosis,
                        rowId: params.node.data.id,
                    })
                    await refetch()
                },
                cssClasses: ["text-red-400"],
            },
            "separator",
            "chartRange",
            "export",
        ]
        return items
    }

    return {
        rowData,
        columnDefs,
        rowIDGetter,
        onGridReady,
        getContextMenuItems,
    }
}

const AINTableConfigs = () => {
    const diagnosis = "AIN Compression" as const
    const data = trpc.diagnosisData.getAllData.useQuery({
        diagnosis,
    }).data
    const refetch = trpc.diagnosisData.getAllData.useQuery({
        diagnosis,
    }).refetch

    const rowData = data
        ? data.map((item) => {
              return {
                  name: item.patient.name,
                  gender: item.patient.gender,
                  birthday: item.patient.birthday,
                  age: getAge(item.patient.birthday),
                  ...item.AINData,
              }
          })
        : []

    const columnDefs = [
        {
            headerName: "基本資料",
            children: [
                { field: "patientId", editable: false, pinned: "left" },
                { field: "name", editable: false, pinned: "left" },
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
                {
                    field: "age",
                    columnGroupShow: "open",
                    editable: false,
                },
            ],
        },
        {
            headerName: "疾病資料",
            children: [{ field: "group" }, { field: "palsySide" }],
        },
        {
            headerName: "追蹤資料",
            children: [
                { field: "postOPMonth", pinned: "left" },
                { field: "admCMAP" },
                { field: "fdiCMAP" },
                { field: "SNAP" },
                { field: "postMed" },
                { field: "2PDSmall" },
                { field: "2PDRing" },
                { field: "2PDNormal" },
                { field: "gripIH" },
                { field: "pinchIH" },
                { field: "fdi" },
                { field: "digAbd" },
                { field: "raAdd" },
                { field: "uiAdd" },
                { field: "froment" },
                { field: "clawing" },
                { field: "wart" },
                { field: "intPlus" },
                { field: "bsrs", editable: false },
                { field: "sf36", editable: false },
                { field: "dash", editable: false },
            ],
        },
    ]

    const rowIDGetter = (params: any) => {
        return `${params.data.id}${params.data.patientId}${params.data.postOPMonth}`
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
                    colId: "postOPMonth",
                    sort: "asc",
                },
            ],
        }
        event.columnApi.applyColumnState(columnState)
    }

    const addData = trpc.diagnosisData.addData.useMutation().mutateAsync
    const deleteData = trpc.diagnosisData.deleteData.useMutation().mutateAsync

    const getContextMenuItems = useCallback(
        (params: GetContextMenuItemsParams) => {
            if (!params.node) {
                return ["export"]
            }

            const patientId = Number(params.node.data.patientId)

            let items = [
                "cut",
                "copy",
                "copyWithHeaders",
                "copyWithGroupHeaders",
                "paste",
                "separator",
                {
                    name: "新增資料",
                    action: async () => {
                        if (!params.node) return

                        await addData({
                            diagnosis,
                            patientId,
                        })
                        await refetch()
                    },
                },
                {
                    name: "刪除資料",
                    action: async () => {
                        if (!params.node) return

                        await deleteData({
                            diagnosis,
                            rowId: params.node.data.id,
                        })
                        await refetch()
                    },
                    cssClasses: ["text-red-400"],
                },
                "separator",
                "chartRange",
                "export",
            ]
            return items
        },
        [],
    )

    return {
        rowData,
        columnDefs,
        rowIDGetter,
        onGridReady,
        getContextMenuItems,
    }
}
