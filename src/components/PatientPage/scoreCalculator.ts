type DimensionScore = {
    dimensionName: string
    score: number
    displayName?: string
}
type CalculatorFunc = (data: any) => {
    totalScore: number
    dimensions: Array<DimensionScore>
}
const MHOCalculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19, q20 } = data
    const { q21, q22, q23, q24, q25, q26, q27, q28, q29, q30 } = data
    const { q31, q32, q33, q34, q35, q36, q37, q38, q39, q40 } = data
    const { q41, q42, q43, q44, q45, q46, q47, q48, q49, q50 } = data
    const { q51, q52, q53, q54, q55, q56, q57 } = data

    const OHFRight = -5 * (q1 + q2 + q3 + q4 + q5 - 25)
    const OHFLeft = -5 * (q6 + q7 + q8 + q9 + q10 - 25)
    const AODLRightOH = -5 * (q11 + q12 + q13 + q14 + q15 - 25)
    const AODLLeftOH = -5 * (q16 + q17 + q18 + q19 + q20 - 25)
    const AODLTH = (-25 / 7) * (q21 + q22 + q23 + q24 + q25 + q26 + q27 - 35)
    const AODHRightOverall = (AODLRightOH + AODLTH) / 2
    const AODHLefttOverall = (AODLLeftOH + AODLTH) / 2
    const Work = 5 * (q28 + q29 + q30 + q31 + q32 - 5)
    const Pain = q33 === 5 ? 0 : -5 * (q33 + q34 + q35 + q36 + q37 - 25)
    const AestheticsRight = (25 / 4) * (q38 + q39 + q40 + q41 - 4)
    const AestheticsLeft = (25 / 4) * (q42 + q43 + q44 + q45 - 4)
    const SatisfactionRight =
        (-25 / 6) * (q46 + q47 + q48 + q49 + q50 + q51 - 30)
    const SatisfactionLeft =
        (-25 / 6) * (q52 + q53 + q54 + q55 + q56 + q57 - 30)

    const dimensions: Array<DimensionScore> = [
        { dimensionName: "手部整體功能 - 右手", score: OHFRight },
        { dimensionName: "手部整體功能 - 左手", score: OHFLeft },
        { dimensionName: "日常活動 - 右手單手", score: AODLRightOH },
        { dimensionName: "日常活動 - 右手整體", score: AODHRightOverall },
        { dimensionName: "日常活動 - 左手單手", score: AODLLeftOH },
        { dimensionName: "日常活動 - 左手整體", score: AODHLefttOverall },
        { dimensionName: "日常活動 - 雙手", score: AODLTH },
        { dimensionName: "工作", score: Work },
        { dimensionName: "疼痛", score: Pain },
        { dimensionName: "美觀 - 右手", score: AestheticsRight },
        { dimensionName: "美觀 - 左手", score: AestheticsLeft },
        { dimensionName: "滿意度 - 右手", score: SatisfactionRight },
        { dimensionName: "滿意度 - 左手", score: SatisfactionLeft },
    ]
    const totalScore =
        ((OHFRight + OHFLeft) / 2 +
            (AODHRightOverall + AODHLefttOverall) / 2 +
            Work +
            Pain +
            (AestheticsRight + AestheticsLeft) / 2 +
            (SatisfactionRight + SatisfactionLeft) / 2) /
        6
    return { totalScore, dimensions }
}

const SF36Calculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19, q20 } = data
    const { q21, q22, q23, q24, q25, q26, q27, q28, q29, q30 } = data
    const { q31, q32, q33, q34, q35, q36 } = data
    const q1Value =
        q1 == 1
            ? 5
            : q1 == 2
            ? 4.4
            : q1 == 3
            ? 3.4
            : q1 == 4
            ? 2
            : q1 == 5
            ? 1
            : q1
    const q21Value =
        q21 == 1
            ? 6
            : q21 == 2
            ? 5.4
            : q21 == 3
            ? 4.2
            : q21 == 4
            ? 3.1
            : q21 == 5
            ? 2.2
            : q21 == 6
            ? 1
            : q21
    const q22Value = q21 == 1 && q22 == 1 ? 6 : 6 - q22
    const q23Value = 7 - q23
    const q26Value = 7 - q26
    const q27Value = 7 - q27
    const q30Value = 7 - q30
    const q34Value = 6 - q34
    const q36Value = 6 - q36

    const PF = q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10 + q11 + q12 // Physical functioning
    const PFTransformed = 5 * (PF - 10)
    const PFZStandardized = (PFTransformed - 84.52404) / 22.8949
    const RP = q13 + q14 + q15 + q16 // Role physical
    const RPTransformed = 25 * (RP - 4)
    const RPZStandardized = (RPTransformed - 81.19907) / 33.79729
    const BP = q21Value + q22Value // Bodily Pain
    const BPTransformed = 10 * (BP - 2)
    const BPZStandardized = (BPTransformed - 75.49196) / 23.55879
    const GH = q1Value + q33 + q34Value + q35 + q36Value // General health
    const GHTransformed = 5 * (GH - 5)
    const GHZStandardized = (GHTransformed - 72.21316) / 20.16964
    const V = q23Value + q27Value + q29 + q31 // Vitality
    const VTransformed = 5 * (V - 4)
    const VZStandardized = (VTransformed - 61.05453) / 20.86942
    const SF = q20 + q32
    const SFTransformed = 12.5 * (SF - 2)
    const SFZStandardized = (SFTransformed - 83.59753) / 22.37642
    const RE = q17 + q18 + q19
    const RETransformed = (100 / 3) * (RE - 3)
    const REZStandardized = (RETransformed - 81.29467) / 33.02717
    const MH = q24 + q25 + q26Value + q28 + q30Value
    const MHTransformed = 4 * (MH - 5)
    const MHZStandardized = (MHTransformed - 74.84212) / 18.01189

    const AGG_PHYS =
        PFZStandardized * 0.42402 +
        RPZStandardized * 0.35119 +
        BPZStandardized * 0.31754 +
        GHZStandardized * 0.24954 +
        VZStandardized * 0.02877 +
        SFZStandardized * -0.00753 +
        REZStandardized * -0.19206 +
        MHZStandardized * -0.22069
    const AGG_MENT =
        PFZStandardized * -0.22999 +
        RPZStandardized * -0.12329 +
        BPZStandardized * -0.09731 +
        GHZStandardized * -0.01571 +
        VZStandardized * 0.23534 +
        SFZStandardized * 0.26876 +
        REZStandardized * 0.43407 +
        MHZStandardized * 0.48581
    const PCS = 50 + AGG_PHYS * 10
    const MCS = 50 + AGG_MENT * 10

    const totalScore = PCS + MCS
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "Physical Component Score", score: PCS },
        { dimensionName: "Mental Component Score", score: MCS },
        { dimensionName: "Physical Function", score: PFZStandardized },
        { dimensionName: "Role Physical", score: RPZStandardized },
        { dimensionName: "Body Pain", score: BPZStandardized },
        { dimensionName: "General Health", score: GHZStandardized },
        { dimensionName: "Vitality", score: VZStandardized },
        { dimensionName: "Social Function", score: SFZStandardized },
        { dimensionName: "Role Emotion", score: REZStandardized },
        { dimensionName: "Mental Health", score: MHZStandardized },
    ]
    return { totalScore, dimensions }
}

const SF12Calculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12 } = data

    const PCSMap: { [qNum: string]: { [value: string]: number } } = {
        q1: { 1: 0, 2: -1.31872, 3: -3.02396, 4: -5.56461, 5: -8.37399 },
        q2: { 1: -7.23216, 2: -3.45555, 3: 0 },
        q3: { 1: -6.24397, 2: -2.73557, 3: 0 },
        q4: { 1: -4.61617, 2: 0 },
        q5: { 1: -5.51747, 2: 0 },
        q6: { 1: 3.04365, 2: 0 },
        q7: { 1: 2.32091, 2: 0 },
        q8: { 1: 0, 2: -3.8013, 3: -6.50522, 4: -8.38063, 5: -11.25544 },
        q9: {
            1: 0,
            2: 0.66514,
            3: 1.36689,
            4: 2.37241,
            5: 2.90426,
            6: 3.46638,
        },
        q10: {
            1: 0,
            2: -0.42251,
            3: -1.14387,
            4: -1.6185,
            5: -2.02168,
            6: -2.44706,
        },
        q11: {
            1: 4.61146,
            2: 3.41593,
            3: 2.34247,
            4: 1.28044,
            5: 0.41188,
            6: 0,
        },
        q12: { 1: -0.33682, 2: -0.94342, 3: -0.18043, 4: 0.11038, 5: 0 },
    }
    const MCSMap: { [qNum: string]: { [value: string]: number } } = {
        q1: { 1: 0, 2: -0.06064, 3: 0.03482, 4: -0.16891, 5: -1.71175 },
        q2: { 1: 3.93115, 2: 1.8684, 3: 0 },
        q3: { 1: 2.68282, 2: 1.43103, 3: 0 },
        q4: { 1: 1.4406, 2: 0 },
        q5: { 1: 1.66968, 2: 0 },
        q6: { 1: -6.82672, 2: 0 },
        q7: { 1: -5.69921, 2: 0 },
        q8: { 1: 0, 2: 0.90384, 3: 1.49384, 4: 1.76691, 5: 1.48619 },
        q9: {
            1: 0,
            2: -1.94949,
            3: -4.09842,
            4: -6.31121,
            5: -7.92717,
            6: -10.19085,
        },
        q10: {
            1: 0,
            2: -0.92057,
            3: -1.65178,
            4: -3.29805,
            5: -4.88962,
            6: -6.02409,
        },
        q11: {
            1: -16.15395,
            2: -10.77911,
            3: -8.09914,
            4: -4.59055,
            5: -1.95934,
            6: 0,
        },
        q12: { 1: -6.29724, 2: -8.26066, 3: -5.63286, 4: -3.13896, 5: 0 },
    }
    const PCS =
        PCSMap.q1[String(q1)] +
        PCSMap.q2[String(q2)] +
        PCSMap.q3[String(q3)] +
        PCSMap.q4[String(q4)] +
        PCSMap.q5[String(q5)] +
        PCSMap.q6[String(q6)] +
        PCSMap.q7[String(q7)] +
        PCSMap.q8[String(q8)] +
        PCSMap.q9[String(q9)] +
        PCSMap.q10[String(q10)] +
        PCSMap.q11[String(q11)] +
        PCSMap.q12[String(q12)] +
        56.57706
    const MCS =
        MCSMap.q1[String(q1)] +
        MCSMap.q2[String(q2)] +
        MCSMap.q3[String(q3)] +
        MCSMap.q4[String(q4)] +
        MCSMap.q5[String(q5)] +
        MCSMap.q6[String(q6)] +
        MCSMap.q7[String(q7)] +
        MCSMap.q8[String(q8)] +
        MCSMap.q9[String(q9)] +
        MCSMap.q10[String(q10)] +
        MCSMap.q11[String(q11)] +
        MCSMap.q12[String(q12)] +
        60.75781

    const totalScore = PCS + MCS
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "Physical Component Score", score: PCS },
        { dimensionName: "Mental Component Score", score: MCS },
    ]
    return { totalScore, dimensions }
}

const BCTCalculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19 } = data

    const SS = (q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10 + q11) / 11 // Symptom Score
    const FS = (q12 + q13 + q14 + q15 + q16 + q17 + q18 + q19) / 8 // Function Score

    const totalScore = (SS + FS) / 2
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "Symptom Score", score: SS },
        { dimensionName: "Function Score", score: FS },
    ]
    return { totalScore, dimensions }
}

const WHOQOLbrefCalculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19, q20 } = data
    const { q21, q22, q23, q24, q25, q26, q27, q28 } = data
    const q3Value = 6 - q3
    const q4Value = 6 - q4
    const q26Value = 6 - q26

    const PHYS = ((q3Value + q4Value + q10 + q15 + q16 + q17 + q18) / 7) * 4
    const PSYCH = ((q5 + q6 + q7 + q11 + q19 + q26Value) / 6) * 4
    const SOCIAL = q20 + q21 + q22 + q27
    const ENVIR = ((q8 + q9 + q12 + q13 + q14 + q23 + q24 + q25 + q28) / 9) * 4

    const PHYSComp = (PHYS - 4) * (25 / 4)
    const PSYCHComp = (PSYCH - 4) * (25 / 4)
    const SOCIALComp = (SOCIAL - 4) * (25 / 4)
    const ENVIRComp = (ENVIR - 4) * (25 / 4)

    const totalScore = (PHYSComp + PSYCHComp + SOCIALComp + ENVIRComp) / 4
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "Physical", score: PHYSComp },
        { dimensionName: "Psychological", score: PSYCHComp },
        { dimensionName: "Social", score: SOCIALComp },
        { dimensionName: "Environmental", score: ENVIRComp },
    ]
    return { totalScore, dimensions }
}

const BSRSCalculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19, q20 } = data
    const { q21, q22, q23, q24, q25, q26, q27, q28, q29, q30 } = data
    const values = [
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
        q11,
        q12,
        q13,
        q14,
        q15,
        q16,
        q17,
        q18,
        q19,
        q20,
        q21,
        q22,
        q23,
        q24,
        q25,
        q26,
        q27,
        q28,
        q29,
        q30,
    ]

    const GSI = values.reduce((acc, curVal) => acc + curVal - 1, 0) / 30
    const PST = values.reduce((acc, curVal) => (curVal > 1 ? acc + 1 : acc), 0)
    const PSDI =
        PST == 0 ? 0 : values.reduce((acc, curVal) => acc + curVal - 1, 0) / PST

    const totalScore = GSI
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "General Symptom Index", score: GSI },
        { dimensionName: "Positive Symptom Total", score: PST },
        { dimensionName: "Positive Symptom Distress Index", score: PSDI },
    ]
    return { totalScore, dimensions }
}

const DASHCalculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19, q20 } = data
    const { q21, q22, q23, q24, q25, q26, q27, q28, q29, q30 } = data
    const { q31, q32, q33, q34, q35, q36, q37, q38 } = data
    const values = [
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
        q11,
        q12,
        q13,
        q14,
        q15,
        q16,
        q17,
        q18,
        q19,
        q20,
        q21,
        q22,
        q23,
        q24,
        q25,
        q26,
        q27,
        q28,
        q29,
        q30,
    ]
    const DASHDys =
        (values.reduce((acc, curVal) => acc + curVal, 0) / 30 - 1) * 25
    const Work = ((q31 + q32 + q33 + q34) / 4 - 1) * 25
    const SportOrInstrument = ((q35 + q36 + q37 + q38) / 4 - 1) * 25

    const totalScore = DASHDys
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "DASH", score: DASHDys },
        { dimensionName: "工作", score: Work },
        { dimensionName: "運動或樂器", score: SportOrInstrument },
    ]
    return { totalScore, dimensions }
}

const qDASHCalculator: CalculatorFunc = (data) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = data
    const { q11, q12, q13, q14, q15, q16, q17, q18, q19 } = data
    const values = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11]

    const QDASHDys =
        (values.reduce((acc, curVal) => acc + curVal, 0) / 11 - 1) * 25
    const Work = ((q12 + q13 + q14 + q15) / 4 - 1) * 25
    const SportOrInstrument = ((q16 + q17 + q18 + q19) / 4 - 1) * 25

    const totalScore = QDASHDys
    const dimensions: Array<DimensionScore> = [
        { dimensionName: "QDASH", score: QDASHDys },
        { dimensionName: "工作", score: Work },
        { dimensionName: "運動或樂器", score: SportOrInstrument },
    ]
    return { totalScore, dimensions }
}

const questionnaireCalculatorMap: {
    [questionnaireName: string]: CalculatorFunc
} = {
    MHO: MHOCalculator,
    SF36: SF36Calculator,
    SF12: SF12Calculator,
    BCT: BCTCalculator,
    WHOQOLbref: WHOQOLbrefCalculator,
    BSRS: BSRSCalculator,
    DASH: DASHCalculator,
    qDASH: qDASHCalculator,
}

export const scoreCalculator = (data: any, questionnaire: string) => {
    return questionnaireCalculatorMap[questionnaire](data)
}
