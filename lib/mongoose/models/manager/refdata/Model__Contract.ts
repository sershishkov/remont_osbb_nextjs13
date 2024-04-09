import { Schema, model, models } from 'mongoose';
import { I_Contract } from '@/interfaces/refdata';

const contract__Schema = new Schema<I_Contract>(
  {
    contractNumber: {
      type: String,
      required: [true, 'Please add a contractNumber'],
      unique: true,
    },
    ourFirm: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a ourFirm id'],
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a client id'],
    },
    contractDate: {
      type: Date,
      default: Date.now,
    },
    contractDescription: {
      type: String,
      required: [true, 'Please add a contractDescription'],
    },
    workAddress: {
      type: String,
      required: [true, 'Please add a workAddress'],
    },
    contractType: {
      type: Schema.Types.ObjectId,
      ref: 'contractType',
      required: [true, 'Please add a contractType id'],
    },
    paymentSource: {
      type: Schema.Types.ObjectId,
      ref: 'paymentSource',
      required: [true, 'Please add a paymentSource id'],
    },
    responsibleManager: {
      type: Schema.Types.ObjectId,
      ref: 'worker',
      required: [true, 'Please add a responsibleManager id'],
    },
    responsibleWorker: {
      type: Schema.Types.ObjectId,
      ref: 'worker',
      required: [true, 'Please add a responsibleWorker id'],
    },
    participantsOfContract: [
      {
        participant: {
          type: Schema.Types.ObjectId,
          ref: 'worker',
          required: [true, 'Please add a worker id'],
        },
        participantPercentage: {
          type: Number,
          required: [true, 'Please add a participantPercentage'],
        },
      },
    ],

    guaranteePeriod: {
      type: String,
      default: '12',
    },
    prepaymentPercentage: {
      type: Number,
      default: 70,
    },

    invoiceNumberBase: {
      type: String,
    },
    invoiceNumberNakl: {
      type: String,
    },
    invoiceNumberAkt: {
      type: String,
    },
    aktNumber: {
      type: String,
    },
    naklNumber: {
      type: String,
    },
    koshtorisNumber: {
      type: String,
    },

    contrProectAvtorskNumber: {
      type: String,
    },
    aktProectAvtorskNumber: {
      type: String,
    },
    jurnalAvtoskiyNumber: {
      type: String,
    },
    jurnalRabotNumber: {
      type: String,
    },
    prikazGipNumber: {
      type: String,
    },
    prikazEngineeNumber: {
      type: String,
    },
    prikazOhranaTrudaNumber: {
      type: String,
    },

    proectnSumBudjet: {
      type: Number,
    },
    avtorskSumBudjet: {
      type: Number,
    },
    expertizaSumBudjet: {
      type: Number,
    },
    tehnadzorSumBudjet: {
      type: Number,
    },
    tehnadzorSumBudjetGlava1_9: {
      type: Number,
    },

    zvedeniySumBudjet: {
      type: Number,
    },
    dogovornayaSumBudjet: {
      type: Number,
    },
    dopUgodaSum: {
      type: Number,
    },
    salaryMin: {
      type: Number,
    },
    salaryLevel_3_8: {
      type: Number,
    },
    planPributokSum: {
      type: Number,
    },
    adminVytratySum: {
      type: Number,
    },
    salaryOneDaySum: {
      type: Number,
    },
    lifeTime: {
      type: Number,
    },
    whereWirkIsPerfomed: {
      type: String,
    },
    servWorkShortForJournal: {
      type: String,
    },

    paymentSourceProectnAvt: {
      type: String,
      enum: ['собств', 'бюджет'],
    },
    startMonthWorkBudjet: {
      type: String,
      enum: [
        'січень',
        'лютий',
        'березень',
        'квітень',
        'травень',
        'червень',
        'липень',
        'серпень',
        'вересень',
        'жовтень',
        'листопад',
        'грудень',
      ],
    },
    endMonthWorkBudjet: {
      type: String,
      enum: [
        'січень',
        'лютий',
        'березень',
        'квітень',
        'травень',
        'червень',
        'липень',
        'серпень',
        'вересень',
        'жовтень',
        'листопад',
        'грудень',
      ],
    },
    kodDkBudjet: {
      type: String,
      default: 'код ДК 021:2015 - 45453000-7 Капітальний ремонт і реставрація',
    },

    endWorkRemservis: {
      type: Date,
    },
    remsCalendarGrafikUnit: {
      type: String,
    },
    remsCalendarGrafikAmount: {
      type: String,
    },

    remsAktSkrytRabotWork: {
      type: String,
    },
    remsAktSkrytRabotMaterial: {
      type: String,
    },

    isMeasured: {
      type: Boolean,
      default: false,
    },
    isEstimateCalculated: {
      type: Boolean,
      default: false,
    },
    isEstimateHasBeenSentToClient: {
      type: Boolean,
      default: false,
    },
    isEstimateApprovedByClient: {
      type: Boolean,
      default: false,
    },
    isMaterialsHaveBeenOrdered: {
      type: Boolean,
      default: false,
    },
    isMaterialsDelivered: {
      type: Boolean,
      default: false,
    },
    isWorkCompleted: {
      type: Boolean,
      default: false,
    },
    isDocumentsHaveBeenIssued: {
      type: Boolean,
      default: false,
    },
    isDocumentsHaveBeenGivenToClient: {
      type: Boolean,
      default: false,
    },
    isClientReturnedSignedDocuments: {
      type: Boolean,
      default: false,
    },
    isContractPaid: {
      type: Boolean,
      default: false,
    },
    isMaterialsPaid: {
      type: Boolean,
      default: false,
    },
    isWorksPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

contract__Schema.virtual('numberOfParticipants').get(function () {
  return this.participantsOfContract?.length;
});

export default models.contract || model('contract', contract__Schema);
