// Application state
let currentQuestionIndex = 0;
let selectedContractType = '';

// Screen management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Select contract type
function selectContract(contractType) {
    selectedContractType = contractType;

    // Update welcome screen title based on contract type
    const titles = {
        'group-contract': 'Group Contract Generator',
        'retail-contract': 'Retail Contract Generator',
        'short-term-contract': 'Short Term Contract Generator'
    };

    document.getElementById('welcome-title').textContent = titles[contractType] || 'Contract Generator';
    showScreen('welcome-screen');
}

// Back to contract selection
function backToSelection() {
    showScreen('selection-screen');
}

// Start the contract filling process
function startContract() {
    currentQuestionIndex = 0;
    userAnswers = {};
    showScreen('question-screen');
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = contractQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-help').textContent = question.help;
    
    const input = document.getElementById('answer-input');
    input.type = question.type;
    input.placeholder = question.placeholder;
    input.value = userAnswers[question.id] || '';
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / contractQuestions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    // Update button states
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').textContent = 
        currentQuestionIndex === contractQuestions.length - 1 ? 'Review' : 'Next';
    
    // Focus on input
    input.focus();
    
    // Allow Enter key to proceed
    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            nextQuestion();
        }
    };
}

// Go to next question
function nextQuestion() {
    const question = contractQuestions[currentQuestionIndex];
    const input = document.getElementById('answer-input');
    const value = input.value.trim();
    
    // Validate required fields
    if (!question.optional && !value) {
        alert('Please answer this question before continuing.');
        return;
    }
    
    // Save answer
    userAnswers[question.id] = value;
    
    // Move to next question or review
    if (currentQuestionIndex < contractQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showReview();
    }
}

// Go to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Show review screen
function showReview() {
    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';
    
    contractQuestions.forEach(question => {
        const answer = userAnswers[question.id];
        if (answer) {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <div class="review-label">${question.question}</div>
                <div class="review-value">${answer}</div>
            `;
            reviewContent.appendChild(item);
        }
    });
    
    showScreen('review-screen');
}

// Edit answers
function editAnswers() {
    showScreen('question-screen');
    displayQuestion();
}

// Generate the contract
function generateContract() {
    const contractContent = document.getElementById('contract-content');
    contractContent.innerHTML = generateContractHTML();
    showScreen('contract-screen');
}

// Start over
function startOver() {
    if (confirm('Are you sure you want to start over? All current data will be lost.')) {
        showScreen('selection-screen');
    }
}

// Print contract
function printContract() {
    // Change title to remove file path from print header
    const originalTitle = document.title;
    document.title = 'Contract';

    // Print
    window.print();

    // Restore original title
    setTimeout(() => {
        document.title = originalTitle;
    }, 100);
}

// Download contract as PDF
function downloadContract() {
    alert('PDF download functionality would require a PDF generation library like jsPDF or html2pdf.js. For now, please use the Print function and save as PDF.');
    printContract();
}

// Generate the complete contract HTML using exact text from the PDF
function generateContractHTML() {
    const a = userAnswers;

    // Build property section
    let propertySection = `(RR#407) ${a.property1Address} – ${a.property1Details}`;
    if (a.property2Address) {
        propertySection += `<br><br>(RR#499) ${a.property2Address} – ${a.property2Details}`;
    }

    return `
        <style>
            .pdf-contract {
                font-family: 'Times New Roman', Times, serif;
                font-size: 10pt;
                line-height: 1.4;
                color: #000;
                max-width: 8.5in;
                margin: 0 auto;
                padding: 0.75in;
                background: white;
            }
            .pdf-contract h1 {
                text-align: center;
                font-size: 20pt;
                font-weight: bold;
                margin: 0;
                letter-spacing: 2px;
            }
            .pdf-contract .spqr {
                text-align: center;
                font-size: 12pt;
                letter-spacing: 4px;
                margin: 5px 0 20px 0;
            }
            .pdf-contract .header-info {
                text-align: center;
                font-size: 8pt;
                margin-bottom: 25px;
                line-height: 1.3;
            }
            .pdf-contract h2 {
                text-align: center;
                font-size: 14pt;
                font-weight: bold;
                margin: 25px 0 8px 0;
            }
            .pdf-contract h3 {
                text-align: center;
                font-size: 12pt;
                font-weight: bold;
                margin: 8px 0 25px 0;
            }
            .pdf-contract .section-title {
                font-weight: bold;
                margin: 15px 0 8px 0;
            }
            .pdf-contract p {
                margin: 8px 0;
                text-align: justify;
            }
            .pdf-contract .center {
                text-align: center;
            }
            .pdf-contract ol {
                margin: 15px 0;
                padding-left: 25px;
            }
            .pdf-contract li {
                margin: 12px 0;
                text-align: justify;
            }
            .pdf-contract .signature-section {
                margin-top: 50px;
            }
            .pdf-contract .signature-line {
                border-top: 2px solid #000;
                padding-top: 8px;
                margin: 35px 0;
                position: relative;
            }
            .pdf-contract .signature-date {
                float: right;
            }
            @media print {
                .pdf-contract {
                    padding: 0.5in;
                }
            }
        </style>

        <div class="pdf-contract">
            <!-- Page 1 -->
            <div style="text-align: center; margin-bottom: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 80 100" style="display: inline-block;">
                    <!-- Dome base -->
                    <ellipse cx="40" cy="85" rx="35" ry="8" fill="none" stroke="#000" stroke-width="1.5"/>
                    <!-- Dome structure -->
                    <path d="M 40 20 Q 15 40 15 65 L 15 85 M 40 20 Q 65 40 65 65 L 65 85" fill="none" stroke="#000" stroke-width="1.5"/>
                    <!-- Vertical lines -->
                    <line x1="40" y1="20" x2="40" y2="85" stroke="#000" stroke-width="1.5"/>
                    <line x1="25" y1="35" x2="25" y2="85" stroke="#000" stroke-width="1"/>
                    <line x1="55" y1="35" x2="55" y2="85" stroke="#000" stroke-width="1"/>
                    <!-- Horizontal arcs -->
                    <path d="M 20 50 Q 40 45 60 50" fill="none" stroke="#000" stroke-width="1"/>
                    <path d="M 17 65 Q 40 60 63 65" fill="none" stroke="#000" stroke-width="1"/>
                    <!-- Top cross -->
                    <line x1="40" y1="5" x2="40" y2="25" stroke="#000" stroke-width="2"/>
                    <line x1="32" y1="10" x2="48" y2="10" stroke="#000" stroke-width="2"/>
                    <!-- Dome cap -->
                    <circle cx="40" cy="20" r="3" fill="#000"/>
                </svg>
            </div>

            <h1>ROMARENTALS</h1>
            <div class="spqr">S·P·Q·R</div>
            <div class="header-info">
                <strong>USA Office:</strong> 340 S. Lemon Ave. #1647, Walnut, CA 91789, USA<br>
                <strong>Italy Meeting Place:</strong> Via del Fienaroli 9A 00153 Roma Italy<br>
                Tel: +39.348.888.1385 (Italy) • +1.760.201.2251 (USA)<br>
                <a href="http://www.romarentals.net">www.romarentals.net</a>
            </div>

            <h2>RENTAL AGREEMENT</h2>
            <h3>(Furnished Premises)</h3>

            <p><strong>THIS LEASE AGREEMENT</strong> made effective as of the ${a.effectiveDate}</p>

            <p class="center"><strong>BETWEEN:</strong></p>

            <p class="center">
                <strong>Roma Rentals SPQR</strong><br>
                (The "Landlord")<br><br>
                For Owner (RR#407): M. Rifrigeri<br>
                For Owner (RR#499): S. Ivarone
            </p>

            <p class="center" style="margin: 20px 0;"><strong>AND</strong></p>

            <p class="center">
                (The "Tenant")<br>
                <strong>${a.tenantName}</strong><br>
                ${a.tenantAddress}<br>
                ${a.tenantCity}<br>
                ${a.tenantPhone}<br>
                <a href="mailto:${a.tenantEmail}">${a.tenantEmail}</a>
            </p>

            <div style="page-break-after: always;"></div>

            <!-- Page 2 -->
            <div class="section-title">WHEREAS:</div>

            <p>The Landlord is the fee owner of the certain real property being, lying and situated in Rome at the following addresses (The "Premises"):</p>

            <p>${propertySection}</p>

            <p><strong>TOTAL: ${a.totalStudents} STUDENTS, ${a.totalApartments} APARTMENTS</strong></p>

            <p>A. The Landlord desires to lease the Premises and any and all appurtenances thereto, to the Tenant, and the Tenant desires to lease the Premises from the Landlord, all upon the terms and conditions contained herein.</p>

            <div class="section-title">THE PARTY HERETO HEREBY AGREE AS FOLLOWS:</div>

            <ol>
                <li>
                    <strong>Transitory Term.</strong> The lease term shall commence on ${a.leaseStartDate} and shall terminate on ${a.leaseEndDate} without any notice of cancellation.
                </li>

                <li>
                    <strong>Rent.</strong> The rent and related series as outlined in this rental agreement shall be the following: ${a.numberOfNights} nights at ${a.rentPerNight} Euro per student, per night.
                </li>

                <li>
                    <strong>Furnishings.</strong> The Premises shall be leased in a furnished condition. A photo inventory shall be conducted at check-in and again at check-out. The apartment shall include the following: sofa, armchairs, table and enough chairs for each person, lamps, furniture, bookshelves, washing machine, crockery, pots, pans, utensils for all occupants, fire extinguisher and smoke detectors. The bedroom shall include: a minimum of one bed and mattress per tenant and bedside table and wardrobe. One set of pillow, sheets, towels and one comforter with one change of the linens will also be provided per occupant.
                </li>

                <li>
                    <strong>Condition of the Premises.</strong> The Landlord has agreed that the apartment will appropriately be furnished and in good working condition in the following manner: bed, storage closets and desk when possible. Table and chairs, living room with sofa, kitchen with stove, refrigerator, microwave, furnished with all appropriate dishes, pans, glasses, silverware, etc. necessary for the tenants to live and cook independently. Washing machine, curtains, rugs and appropriate decorations will be present.
                </li>
            </ol>

            <div style="page-break-after: always;"></div>

            <!-- Page 3 -->
            <ol start="5">
                <li>
                    <strong>Utilities.</strong> The monthly rental fee does not include the cost of electricity or the cost of gas/heating services. Those costs based on usage will be due in addition to the monthly rental fee. Bills will be presented for reimbursement by the Landlords at the end of the rental period. If bills are not available, as sometimes, a meter reading will be taken at the beginning and at the end of the rental period. A €0.49 KW for electricity will be used and a €1.48 m³ for gas will be used. The amount will be invoiced and payable within 14 days of receipt at the end of rental or can be taken from the security deposit. The Landlord reserves the right to recalculate the cost for utilities based on the Italian government or utilities company mandates for the new pricing during the lease period. The Landlord will be providing Wi-Fi connectivity in each apartment. The Tenant will be given a password to access the network at check-out.
                </li>

                <li>
                    <strong>Use of the Premises.</strong> The Premises shall be used for residential purposes as a private single dwelling only and shall be occupied by no more than the number of tenants listed per apartment. No part of the Premises shall be used at any time during the term of this Transitory Lease Agreement for the purpose of carrying on any business, profession, or trade of any kind. The Tenant's use of the Premises shall be in a lawful, careful, safe, and proper manner, and Tenant shall carefully preserve, protect, control, and guard the same from damage. The Tenant shall maintain the Premises in a clean, tidy, and sanitary condition. The Tenant covenants that they shall not engage in, or permit any member on this lease or any guest or invitee to engage in, conduct to interfere substantially with the comfort and safety of residents of adjacent apartment.
                </li>

                <li>
                    <strong>Alterations and Improvements.</strong> The Tenant shall make no alterations, improvements or additions to the Premises or any portion thereof or construct any building or make any other improvements on the Premises without the prior written consent of the Landlord.
                </li>

                <li>
                    <strong>Repairs, Maintenance, Upkeep.</strong> The Tenant shall keep the Premises in good repair and shall promptly notify the Landlord of any repairs or maintenance required. The Tenant shall promptly advise the Landlord of any condition, which the Tenant considers to be dangerous, defective, and unsafe, or in urgent need of correction in, on or about the Premises. The Landlord shall promptly repair or correct such a condition in a fair and reasonable time frame. The Tenant shall maintain and keep the furnishings, floor coverings, window coverings, appliances, fixtures, walls and all other personal property, household goods and effects belonging to the Landlord in good order and condition, walls (paint) to be in same condition and shall repair, replace any items damaged during lease at own expense repair partly at the Tenant's expense, all loss or damage to any such items resulting from misuse, waste or neglect on the part of the Tenant or invitees. The Tenant shall bear the full cost of any repairs required to the heating, air conditioning, electrical, gas, or plumbing resulting from misuse, waste, or neglect on the part of the Tenant, the Tenant family or their guests or invitees. Any repairs due to normal non-function not due to tenant, the Tenant family or their guests shall be at the sole expense of the Landlord. In case of an emergency that possesses an immediate risk to health, life, property, or environment of the apartment the Tenant shall call the emergency services number of the appropriate authorities listed in the apartment handbook (Police, Fire Department, etc). Roma Rentals SPQR LLC will provide the portal address (<a href="http://www.romarentals.net/connect/">www.romarentals.net/connect/</a>) to submit maintenance requests for all other manageable situations and will provide a temporary fix until problem can be fully remedied in a reasonable amount of time. This is a non-smoking apartment. Any violation of smoking inside the apartment will result in a saving fee for the tenant of smoke smell and residue included and not limited to professional cleaning up as well as the painting of the walls if necessary. Roma Rentals will provide a light cleaning scheduled bi-monthly of the common spaces. The service does not include washing of dirty dishes/pans left in the sink or the removal of garbage or recyclables. Items and a set of towels will be provided every day following the exchange protocol. A new pillow and duvet with cover will be provided for each tenant at check in. Damage or missing article if with is not applied wet and duvet covers and linens not present at check-out.
                </li>
            </ol>

            <div style="page-break-after: always;"></div>

            <!-- Page 4 -->
            <p style="margin-top: 0;">appliances, fixtures, walls and all other personal property, household goods and effects belonging to the Landlord in good order and condition, walls (paint) to be in same condition and shall repair, replace any items damaged during lease at own expense or repaired partly at the Tenant's expense, all loss or damage to any such items resulting from misuse, waste or neglect on the part of the Tenant or invitees. The Tenant shall bear the full cost of any repairs required to the heating, air conditioning, electrical, gas, or plumbing resulting from misuse, waste, or neglect on the part of the Tenant, the Tenant family or their guests or invitees. Any repairs due to normal non-function not due to Tenant, the Tenant family or their guests shall be at the sole expense of the Landlord. In case of an emergency that possesses an immediate risk to health, life, property, or environment of the apartment the Tenant shall call the emergency services number of the appropriate authorities listed in the apartment handbook (Police, Fire Department, etc). Roma Rentals SPQR LLC will provide a portal address (<a href="http://www.romarentals.net/connect/">www.romarentals.net/connect/</a>) to submit maintenance requests for all other manageable situations and will provide a temporary fix until problem can be fully remedied in a reasonable amount of time. This is a non-smoking apartment. Any violation of smoking inside the apartment will result in a saving fee for the tenant of smoke smell and residue included and not limited to professional cleaning up as well as the painting of the walls if necessary. Roma Rentals will provide a light cleaning scheduled bi-monthly of the common space. The service does not include washing of dirty dishes/pans left in the sink or the removal of garbage or recyclables. Linens and a set of towels will be provided on cleaning day following the exchange protocol. A new pillow and duvet with cover will be provided for each tenant at check in. Damage or missing article fees will be applied for duvet and duvet covers and linens not present at check-out.</p>

            <ol start="9">
                <li>
                    <strong>Security Deposit.</strong> The Tenant shall deposit with the Landlord Five Hundred EURO (€${a.securityDeposit}.00) PER TENANT, receipt of which is hereby acknowledged by the Landlord, as security for any damage caused to the Premises, the furnishings, painting, household goods or other personal property of the Landlord during the term hereof. The deposit shall be returned to the Tenant within 60 days of the exit date from our San Diego office (<a href="mailto:tina@romarentals.net">tina@romarentals.net</a>) without interest thereon, less any set-off for final exit bill balances, unpaid utilities, any damages and final exit cleaning and laundry fee upon termination of this Agreement.
                </li>
            </ol>

            <div style="page-break-after: always;"></div>

            <!-- Page 5 -->
            <ol start="10">
                <li>
                    <strong>Surrender of Premises.</strong> Upon the expiration or termination of this Lease, the Tenant shall at once surrender possession to the Landlord of the Premises and all furnishings and household goods and effects and other personal property of the Landlord in a condition and state of repair like its original condition and state of repair at the commencement of the lease term, reasonable wear and tear excepted. In case of cancellation or early termination after the start of location the Client will lose the entire amount of rent for that month and security deposit unless the Company is able to re-rent the apartment for the same duration of the original contract, without any interruption in rents owed.
                </li>

                <li>
                    <strong>Hazardous Materials.</strong> The Tenant shall not keep in, on or about the Premises any dangerous, flammable, or explosive material which might reasonably be considered a fire hazard or could increase the risk of explosion on the Premises, or which might be considered hazardous by an insurance company.
                </li>

                <li>
                    <strong>Quiet Enjoyment.</strong> At all times when the Tenant are not in default of any of the Tenant's obligations hereunder, including the payment of all sums to be paid by the Tenant hereunder, the Tenant shall and may peacefully and quietly have, hold and enjoy the Premises for the term hereof. The Tenant must abide by all rules and regulations set forth by Roma Rentals SPQR and each individual condominium unit. The Tenant will be responsible for any violation of these rules that may result in complaints from neighbors and/or a formal complaint from a Police agency. Damage fees could be levied.
                </li>

                <li>
                    <strong>Inspection of Premises.</strong> The Landlord shall have the right to enter upon the Premises at all reasonable times for the purpose of inspecting the same, and to show apartment during the last thirty (30) days of the lease term; provided, however, that the Landlord shall not unreasonably interfere with the Tenant's use of the Premises. Except in emergency situations, the Landlord shall give the Tenant at least 24 hours prior notice of intention to seek access, the date and time at which the Landlord is seeking access and the reason, therefore.
                </li>

                <li>
                    <strong>Default.</strong> In the event of default by the Tenant hereunder, the Tenant shall remain liable for all rent due or to become due during the term of this Lease. The Landlord shall have the obligation to rent the premises in the Landlord's name for the balance of the term.
                </li>
            </ol>

            <div style="page-break-after: always;"></div>

            <!-- Page 6 -->
            <ol start="15">
                <li>
                    <strong>Assignment and Transfer of Contract.</strong> The parties acknowledge and agree that Roma Rentals SPQR, LLC (the "Company") may, at its sole discretion, sell, transfer, or assign all or part of its business, including this contract, to a third party as part of any sale, merger, or transfer of the Company or its assets. In such event, all rights and obligations under this contract shall be assigned and transferred to the new owner or assignee, who will need no additional consent from the other party, provided that the new owner or assignee assumes the obligations set forth in this contract.
                </li>

                <li>
                    <strong>Breach by Tenant.</strong> In the event of any breach by the Tenant of any of the Tenant's covenants or agreements herein, the Landlord may give Tenant 30 days' notice to cure the breach, setting out which covenant(s) or agreement(s) have been breached. If the breach is not cured within the said 30-day period or reasonable steps to effectuate such a cure are not commenced and diligently pursued within the said 30-day period and thereafter until the breach has been cured, the Landlord may terminate this lease within said 30 days. Upon terminating this lease as provided herein, the Landlord may commence eviction proceedings against the Tenant as provided for by law.
                </li>

                <li>
                    <strong>Breach by Landlord.</strong> In the event of any breach by Landlord of any of Landlord's covenants or agreements herein, the Tenant may give the Landlord 30 days' notice to cure the breach, setting out which covenant(s) or agreement(s) have been breached. If the breach is not cured within the said 30-day period, or reasonable steps to effectuate such a cure are not commenced and diligently pursued within the said 30-day period and thereafter until the breach has been cured, rent hereunder shall be fully abated from the time at which the said 30-day period expired (and thereafter until such time as the Landlord has fully cured the breach set forth in the Tenant' notice.
                </li>

                <li>
                    <strong>Animals/Pets.</strong> No animals or pets for possession in apartment during transitory stay without prior written consent from the Landlord. A non-refundable pet cleaning of €${a.petCleaningFee}.00 fee will be charged if violated.
                </li>

                <li>
                    <strong>Sublet.</strong> Tenants may not, for any reasons, sublet an apartment or have any overnight guests without prior written approval and copies of documents.
                </li>
            </ol>

            <p><strong>Entire Agreement.</strong> This Lease Agreement constitutes the entire agreement between the parties.</p>

            <div style="page-break-after: always;"></div>

            <!-- Page 7 -->
            <p style="margin-top: 50px;"><strong>IN WITNESS WHERE OF</strong>, the Landlord and the Tenant have executed this Lease Agreement as of the date first set forth above.</p>

            <div class="signature-section">
                <div class="signature-line">
                    Jennifer Hoover, Director of Finance & Operations<br>
                    University of Notre Dame
                    <span class="signature-date">Date: _______________</span>
                </div>

                <div class="signature-line">
                    Carolina M. Murillo, Roma Rentals SPQR LLC CEO
                    <span class="signature-date">Date: _______________</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 80px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 80 100" style="display: inline-block; opacity: 0.4;">
                    <!-- Dome base -->
                    <ellipse cx="40" cy="85" rx="35" ry="8" fill="none" stroke="#000" stroke-width="1.5"/>
                    <!-- Dome structure -->
                    <path d="M 40 20 Q 15 40 15 65 L 15 85 M 40 20 Q 65 40 65 65 L 65 85" fill="none" stroke="#000" stroke-width="1.5"/>
                    <!-- Vertical lines -->
                    <line x1="40" y1="20" x2="40" y2="85" stroke="#000" stroke-width="1.5"/>
                    <line x1="25" y1="35" x2="25" y2="85" stroke="#000" stroke-width="1"/>
                    <line x1="55" y1="35" x2="55" y2="85" stroke="#000" stroke-width="1"/>
                    <!-- Horizontal arcs -->
                    <path d="M 20 50 Q 40 45 60 50" fill="none" stroke="#000" stroke-width="1"/>
                    <path d="M 17 65 Q 40 60 63 65" fill="none" stroke="#000" stroke-width="1"/>
                    <!-- Top cross -->
                    <line x1="40" y1="5" x2="40" y2="25" stroke="#000" stroke-width="2"/>
                    <line x1="32" y1="10" x2="48" y2="10" stroke="#000" stroke-width="2"/>
                    <!-- Dome cap -->
                    <circle cx="40" cy="20" r="3" fill="#000"/>
                </svg>
            </div>
        </div>
    `;
}

