export const chartsOfAccounts = [
    {
      "code": "10000",
      "name": "Aset Lancar"
    },
    {
      "code": "10100",
      "name": "Kas dan Setara Kas"
    },
    {
      "code": "10200",
      "name": "Rekening Bank"
    },
    {
      "code": "10300",
      "name": "Piutang Mahasiswa"
    },
    {
      "code": "10400",
      "name": "Piutang Lainnya"
    },
    {
      "code": "10500",
      "name": "Persediaan"
    },
    {
      "code": "10600",
      "name": "Biaya Dibayar Di Muka"
    },
    {
      "code": "11000",
      "name": "Aset Tetap"
    },
    {
      "code": "11100",
      "name": "Tanah"
    },
    {
      "code": "11200",
      "name": "Gedung"
    },
    {
      "code": "11300",
      "name": "Peralatan"
    },
    {
      "code": "11400",
      "name": "Furnitur dan Fasilitas"
    },
    {
      "code": "11500",
      "name": "Akumulasi Penyusutan"
    },
    {
      "code": "12000",
      "name": "Aset Tak Berwujud"
    },
    {
      "code": "12100",
      "name": "Hak Cipta"
    },
    {
      "code": "12200",
      "name": "Paten"
    },
    {
      "code": "12300",
      "name": "Lisensi"
    },
    {
      "code": "20000",
      "name": "Kewajiban Jangka Pendek"
    },
    {
      "code": "20100",
      "name": "Hutang Usaha"
    },
    {
      "code": "20200",
      "name": "Hutang Gaji"
    },
    {
      "code": "20300",
      "name": "Hutang Pajak"
    },
    {
      "code": "20400",
      "name": "Hutang Jangka Pendek Lainnya"
    },
    {
      "code": "21000",
      "name": "Kewajiban Jangka Panjang"
    },
    {
      "code": "21100",
      "name": "Hutang Bank Jangka Panjang"
    },
    {
      "code": "21200",
      "name": "Hutang Obligasi"
    },
    {
      "code": "21300",
      "name": "Hutang Jangka Panjang Lainnya"
    },
    {
      "code": "30000",
      "name": "Ekuitas"
    },
    {
      "code": "30100",
      "name": "Modal Disetor"
    },
    {
      "code": "30200",
      "name": "Laba Ditahan"
    },
    {
      "code": "30300",
      "name": "Cadangan"
    },
    {
      "code": "30400",
      "name": "Pendapatan Komprehensif Lainnya"
    },
    {
      "code": "40000",
      "name": "Pendapatan"
    },
    {
      "code": "40100",
      "name": "Pendapatan Kuliah"
    },
    {
      "code": "40200",
      "name": "Pendapatan Sumbangan"
    },
    {
      "code": "40300",
      "name": "Pendapatan Sponsorship"
    },
    {
      "code": "40400",
      "name": "Pendapatan Penjualan"
    },
    {
      "code": "40500",
      "name": "Pendapatan Investasi"
    },
    {
      "code": "50000",
      "name": "Biaya"
    },
    {
      "code": "50100",
      "name": "Biaya Gaji"
    },
    {
      "code": "50200",
      "name": "Biaya Operasional"
    },
    {
      "code": "50300",
      "name": "Biaya Pendidikan"
    },
    {
      "code": "50400",
      "name": "Biaya Pemeliharaan"
    },
    {
      "code": "50500",
      "name": "Biaya Administrasi"
    },
    {
      "code": "50600",
      "name": "Biaya Utilities"
    },
    {
      "code": "50700",
      "name": "Biaya Penyusutan"
    },
    {
      "code": "50800",
      "name": "Biaya Amortisasi"
    },
    {
      "code": "50900",
      "name": "Biaya Lainnya"
    }
]

export const ENTRY_TYPE = {
  debit: "debit",
  credit: "credit",
}

export const ENTRIES = {
  "sales_payment_in_advance": {
    "description": "Sales billed to the customers with payment in advance.",
    "actions": [
      {
        "code": "10100",
        "name": "Cash/Bank",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "40100",
        "name": "Tuition Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "sales_payment": {
    "description": "Sales billed to the customers with no payment involved.",
    "actions": [
      {
        "code": "10300",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "40100",
        "name": "Tuition Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "student_tuition_payment_in_advance": {
    "description": "Payment received from students for tuition fees.",
    "actions": [
      {
        "code": "10100",
        "name": "Cash/Bank",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "40100",
        "name": "Tuition Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "student_tuition_payment": {
    "description": "Tuition fees billed to the students with no payment involved.",
    "actions": [
      {
        "code": "10300",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "40100",
        "name": "Tuition Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "faculty_salary_payment": {
    "description": "Payment of salaries to faculty members.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Salaries Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "2XXXX",
        "name": "Salaries Payable",
        "type": "Credit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "research_grant_received": {
    "description": "Funds received from external sources for research purposes.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "4XXXX",
        "name": "Grant Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "library_fees_payment": {
    "description": "Payment received from students or others for library services.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "4XXXX",
        "name": "Library Fees Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "purchase_of_lab_equipment": {
    "description": "Purchase of equipment for the university laboratory.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Lab Equipment",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "utilities_expense_payment": {
    "description": "Payment of utility expenses, such as electricity and water.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Utilities Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "2XXXX",
        "name": "Accounts Payable",
        "type": "Credit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "student_scholarship_award": {
    "description": "Awarding of scholarships to students.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Scholarship Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "2XXXX",
        "name": "Scholarships Payable",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "academic_conference_registration_fees": {
    "description": "Registration fees received for academic conferences.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "4XXXX",
        "name": "Conference Fees Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "deferred_tuition_revenue_recognition": {
    "description": "Recognition of tuition revenue that was previously deferred.",
    "actions": [
      {
        "code": "2XXXX",
        "name": "Deferred Tuition Revenue",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "4XXXX",
        "name": "Tuition Revenue",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "building_maintenance_expense": {
    "description": "Payment for the maintenance of university buildings.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Maintenance Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "2XXXX",
        "name": "Accounts Payable",
        "type": "Credit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "purchase_of_office_supplies": {
    "description": "Purchase of office supplies for university operations.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Office Supplies Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "purchase_of_buildings": {
    "description": "Purchase of buildings for university use.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Buildings",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "purchase_of_land": {
    "description": "Purchase of land for university expansion.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Land",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "purchase_of_cars": {
    "description": "Purchase of vehicles for university operations.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Vehicles",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "construction_project_fees": {
    "description": "Fees incurred for construction projects to expand university facilities.",
    "actions": [
      {
        "code": "1XXXX",
        "name": "Construction in Progress",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "2XXXX",
        "name": "Accounts Payable",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "rent_and_related_expenses": {
    "description": "Payment for rent and related expenses such as electricity.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Rent Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "5XXXX",
        "name": "Electricity Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "2XXXX",
        "name": "Accounts Payable",
        "type": "Credit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "miscellaneous_operational_expenses": {
    "description": "Payment for various operational expenses not categorized elsewhere.",
    "actions": [
      {
        "code": "5XXXX",
        "name": "Miscellaneous Expense",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "1XXXX",
        "name": "Cash/Bank",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  }
}

export interface EntryAction {
  code: string,
  type: string,
}
