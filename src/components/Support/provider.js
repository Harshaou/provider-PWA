export const data = [
  {
    sectionTitle: 'Claims',
    questions: [
      {
        question: 'How do we submit claims?',
        answers: [
          {
            type: 'text',
            answer: 'Fully completed signed claim form',
          },
          {
            type: 'text',
            answer: 'Itemized invoices',
          },
          {
            type: '<a>',
            answer: 'Submit as per the instructions on',
            url: '/ServiceProviderUserManual.pdf',
          },
          {
            type: 'button',
            answer: 'Click here to submit New Claim',
            url: '/newClaim',
          },
        ],
      },
      {
        question: 'What is the procedure for discharging patients?',
        answers: [
          {
            type: 'text',
            answer: 'Attach fully filled and signed claim form',
          },
          {
            type: 'text',
            answer: 'Itemized invoices',
          },
          {
            type: '<a>',
            answer: ['Submit as per the instructions on'],
            url: '/ServiceProviderUserManual.pdf',
          },
        ],
      },
      {
        question: 'How do I view the status of my submitted claims?',
        answers: [
          {
            type: 'Link',
            url: '/claims',
            answer: 'click here',
          },
        ],
      },
      {
        question: 'How long do I have to submit a claim?',
        answers: [
          {
            type: 'text',
            answer:
              'You can submit a claim up to 90 days after the service was delivered to the patient.',
          },
        ],
      },
      {
        question: 'What is the admission scheduling procedure?',
        answers: [
          {
            type: 'text',
            answer: 'Submit a request online 24 hours before the scheduled date',
          },
          {
            type: 'text',
            answer:
              'A letter of undertaking(LOU) will be forwarded to the hospital pre-authorizing the admission .',
          },
          {
            type: 'text',
            answer:
              'The LOU will indicate the amount payable by EC and the ailment the member is being treated for.',
          },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Payment',
    questions: [
      {
        question: 'How do I check payment status?',
        answers: [
          {
            type: 'Link',
            url: '/payments',
            answer: 'click here',
          },
        ],
      },
      {
        question: 'How long does it take to receive payment?',
        answers: [
          {
            type: 'text',
            answer:
              'Provided all the necessary information has been submitted your claim will be paid within 30 days.',
          },
        ],
      },
      {
        question: 'How do we receive payment after approval is done on the portal?',
        answers: [
          {
            type: 'text',
            answer:
              'Payment is done within 30 days of receipt of fully documented invoices by Electronic Fund Transfer',
          },
        ],
      },
      {
        question: 'What is the reconciliation procedure?',
        answers: [
          {
            type: 'text',
            answer:
              'This is done through a continuous process through communication of errors and disputes and resolution of the same. However, in the event of unexplained differences either party may in writing request a formal reconciliation citing the reasons for the request. Once requested, this must be carried out and should be completed within sixty (60)days and appropriate action.',
          },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Pre-authorization',
    questions: [
      {
        question: 'What is the TAT for pre-auth approval?',
        answers: [
          {
            type: 'text',
            answer: 'within working hours(7am-8pm)',
          },
        ],
      },

      {
        question: 'What requires pre-authorization?',
        answers: [
          {
            type: 'text',
            answer: 'All optical services excluding consults',
          },
          {
            type: 'text',
            answer: 'All Dental services excluding consults',
          },
          {
            type: 'text',
            answer: 'Pharmacy prescription above Rwandan franc 150,000',
          },
          {
            type: 'text',
            answer: 'Inpatient admissions',
          },
          {
            type: 'text',
            answer: 'All day case procedures',
          },
          {
            type: 'text',
            answer: 'Physiotherapy treatment exceeding 5 sessions',
          },
          {
            type: 'text',
            answer: 'Laboratory investigations exceeding Rwandan Franc 150,000',
          },
        ],
      },
      {
        question: 'What is the emergency admission procedure?',
        answers: [
          {
            type: 'text',
            answer:
              'The provider will admit the patient however liability of the bill is subject to receipt of the fully filled pre-authorization form and limited to policy terms.',
          },
          {
            type: 'text',
            answer: 'All Dental services excluding consults',
          },
          {
            type: 'text',
            answer:
              'The hospital should notify EC within 12  hours of admission and approval shared directly to the hospital by EC.',
          },
        ],
      },
    ],
  },
  {
    sectionTitle: 'General inquiries',
    questions: [
      {
        question: 'Who is your regulator?',
        answers: [
          {
            type: 'text',
            answer: 'The National bank of Rwanda',
          },
        ],
      },
      {
        question: 'Where are your offices?',
        answers: [
          {
            type: 'text',
            answer: 'Norrsken Kigali House (former Ecole Belge de Kigali)',
          },
        ],
      },
      {
        question: 'How do I register a new branch?',
        answers: [
          {
            type: 'text',
            answer: 'To register a new branch please send an email to provider@edencaremedical.com',
          },
        ],
      },
      {
        question: 'What is offsmart procedure?',
        answers: [
          {
            type: 'text',
            answer: 'Scan smartcard/ID Card',
          },
          {
            type: 'text',
            answer: 'Send to support@edencaremedical.com',
          },
          {
            type: 'text',
            answer: 'State reason for offsmart',
          },
        ],
      },
      {
        question: 'How do we resolve undetected finger prints issues?',
        answers: [
          {
            type: 'text',
            answer: 'Scan smartcard/ID Card',
          },
          {
            type: 'text',
            answer: 'Send to support@edencaremedical.com',
          },
          {
            type: 'text',
            answer: 'State reason for offsmart',
          },
        ],
      },
      {
        question: 'How do I resolve portal downtime?',
        answers: [
          {
            type: 'text',
            answer:
              'Providers and members with any technical challenges will call the care center through 0791 446 610 or email via support@edencaremedical.com.',
          },
          {
            type: 'text',
            answer: 'Agent notes down the nature of the technical challenge.',
          },
          {
            type: 'text',
            answer: 'Picks up contacts and names of the caller.',
          },
          {
            type: 'text',
            answer: 'Notifies the caller that the case will be picked up by the Eden care IT team.',
          },
          {
            type: 'text',
            answer: 'Escalates to IT personnel for action.',
          },
        ],
      },
    ],
  },
];
