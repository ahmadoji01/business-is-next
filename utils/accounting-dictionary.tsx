export const chartsOfAccounts = [
  {
      "code": "10000",
      "name": "Cash and Cash Equivalents"
  },
  {
      "code": "10100",
      "name": "Accounts Receivable"
  },
  {
      "code": "10200",
      "name": "Inventory"
  },
  {
      "code": "10210",
      "name": "Raw Materials Inventory"
  },
  {
      "code": "10220",
      "name": "Finished Goods Inventory"
  },
  {
      "code": "10300",
      "name": "Prepaid Expenses"
  },
  {
      "code": "10400",
      "name": "Property, Plant, and Equipment (PP&E)"
  },
  {
      "code": "10410",
      "name": "Vehicles"
  },
  {
      "code": "10500",
      "name": "Accumulated Depreciation (contra asset)"
  },
  {
      "code": "10600",
      "name": "Intangible Assets"
  },
  {
      "code": "10700",
      "name": "Investments"
  },
  {
      "code": "10800",
      "name": "Other Assets"
  },
  {
      "code": "20000",
      "name": "Accounts Payable"
  },
  {
      "code": "20100",
      "name": "Accrued Expenses"
  },
  {
      "code": "20200",
      "name": "Notes Payable"
  },
  {
      "code": "20210",
      "name": "Short-term Debt"
  },
  {
      "code": "20300",
      "name": "Long-term Debt"
  },
  {
      "code": "20400",
      "name": "Deferred Revenue"
  },
  {
      "code": "20500",
      "name": "Other Liabilities"
  },
  {
      "code": "30000",
      "name": "Common Stock / Share Capital"
  },
  {
      "code": "30100",
      "name": "Retained Earnings"
  },
  {
      "code": "30200",
      "name": "Additional Paid-In Capital"
  },
  {
      "code": "30300",
      "name": "Treasury Stock (contra equity)"
  },
  {
      "code": "30400",
      "name": "Accumulated Other Comprehensive Income"
  },
  {
      "code": "40000",
      "name": "Sales Revenue"
  },
  {
      "code": "40100",
      "name": "Service Revenue"
  },
  {
      "code": "40200",
      "name": "Interest Income"
  },
  {
      "code": "40300",
      "name": "Other Income"
  },
  {
      "code": "50000",
      "name": "Cost of Goods Sold (COGS)"
  },
  {
      "code": "50100",
      "name": "Salaries and Wages"
  },
  {
      "code": "50200",
      "name": "Rent Expense"
  },
  {
      "code": "50300",
      "name": "Utilities Expense"
  },
  {
      "code": "50400",
      "name": "Depreciation Expense"
  },
  {
    "code": "50500",
    "name": "Advertising Expense"
  },
  {
    "code": "50600",
    "name": "Interest Expense"
  },
  {
    "code": "50700",
    "name": "Other Operating Expenses"
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
        "code": "10000",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "40000",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "sales_payment": {
    "description": "Sales billed to the customers with no payment involved.",
    "actions": [
      {
        "code": "10100",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "40100",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "receivable_payment": {
    "description": "Payment for receivable.",
    "actions": [
      {
        "code": "10100",
        "type": "Credit",
        "cashflow": "none"
      },
      {
        "code": "10000",
        "type": "Debit",
        "cashflow": "in"
      }
    ]
  },
  "student_tuition_payment_in_advance": {
    "description": "Payment received from students for tuition fees.",
    "actions": [
      {
        "code": "10000",
        "type": "Debit",
        "cashflow": "in"
      },
      {
        "code": "40000",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "student_tuition_payment": {
    "description": "Tuition fees billed to the students with no payment involved.",
    "actions": [
      {
        "code": "10100",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "40000",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "purchase_paid_and_delivered": {
    "description": "Purchase with payment in advance and goods delivered",
    "actions": [
      {
        "code": "10200",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "10000",
        "type": "Credit",
        "cashflow": "out"
      }
    ]
  },
  "purchase_paid_and_undelivered": {
    "description": "Purchase with payment in advance but goods undelivered",
    "actions": [
      {
        "code": "10100",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "40000",
        "type": "Credit",
        "cashflow": "none"
      }
    ]
  },
  "purchase_unpaid": {
    "description": "Purchase without payment",
    "actions": [
      {
        "code": "10200",
        "type": "Debit",
        "cashflow": "none"
      },
      {
        "code": "20000",
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
