import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PublicComplaint } from './public-complaints.model';
import { PublicComplaintsService } from './public-complaints.service';
import { CodesService } from '../../system-settings/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/common-response.model';

@Component({
    selector: 'public-complaints',
    templateUrl: './public-complaints.component.html',
    styleUrls: ['./public-complaints.component.scss']
})
export class PublicComplaintsComponent implements OnInit {
    // Observables
    complaints$: Observable<PublicComplaint[] | undefined>;
    codes$: Observable<any>;
    isLoading$: Observable<boolean>;

    // Forms
    searchForm: FormGroup;
    complaintForm: FormGroup;

    // Dialog states
    displayAddEditDialog: boolean = false;
    displayPreviewDialog: boolean = false;

    // State
    submitted: boolean = false;
    isEditMode: boolean = false;
    selectedComplaint: PublicComplaint | null = null;
    isSaving: boolean = false;
    isConverting: boolean = false;

    constructor(
        private fb: FormBuilder,
        private publicComplaintsService: PublicComplaintsService,
        private codesService: CodesService,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef
    ) {
        this.initSearchForm();
        this.initComplaintForm();
    }

    ngOnInit(): void {
        this.complaints$ = this.publicComplaintsService.complaints$;
        this.isLoading$ = this.publicComplaintsService.isLoading$;
        this.initCodes();
        this.fetchComplaints();
    }

    private initCodes(): void {
        this.codes$ = this.codesService.getPageCodes('complaint');
    }

    private initSearchForm(): void {
        this.searchForm = this.fb.group({
            FromDate: [null],
            ToDate: [null]
        });
    }

    private initComplaintForm(): void {
        this.complaintForm = this.fb.group({
            ID: [null],
            Center: [null, [Validators.required]],
            ComplainantName: ['', [Validators.required, Validators.maxLength(100)]],
            ComplainantAddress: [null, [Validators.required]],
            ComplainantAddressDetails: ['', [Validators.maxLength(500)]],
            ComplainantMobileNumber: ['', [Validators.required, Validators.maxLength(15)]],
            ComplainantEmail: ['', [Validators.email]],
            ComplaintDescription: ['', [Validators.required, Validators.maxLength(4000)]],
            ComplainantGender: [null, [Validators.required]]
        });
    }

    get formControls() {
        return this.complaintForm.controls;
    }

    fetchComplaints(): void {
        const params = this.searchForm.value;
        this.publicComplaintsService.getPublicComplaints(params);
    }

    clearSearch(): void {
        this.searchForm.reset();
        this.fetchComplaints();
    }

    // Add/Edit Dialog
    openAddDialog(): void {
        this.isEditMode = false;
        this.complaintForm.reset();
        this.submitted = false;
        this.displayAddEditDialog = true;
    }

    openEditDialog(complaint: PublicComplaint): void {
        this.isEditMode = true;
        this.complaintForm.patchValue(complaint);
        this.submitted = false;
        this.displayAddEditDialog = true;
    }

    closeAddEditDialog(): void {
        this.displayAddEditDialog = false;
        this.complaintForm.reset();
        this.submitted = false;
    }

    saveComplaint(): void {
        this.submitted = true;
        if (this.complaintForm.valid) {
            this.isSaving = true;
            const data = this.complaintForm.value;
            this.publicComplaintsService.savePublicComplaint(data)
                .subscribe({
                    next: (response: Response) => {
                        this.isSaving = false;
                        if (response?.status > 0) {
                            this.toastr.success('تم الحفظ بنجاح');
                            this.closeAddEditDialog();
                            this.fetchComplaints();
                        }
                    },
                    error: () => {
                        this.isSaving = false;
                    }
                });
        }
    }

    // Preview Dialog (Convert to Official)
    openPreviewDialog(complaint: PublicComplaint): void {
        this.selectedComplaint = complaint;
        this.displayPreviewDialog = true;
    }

    closePreviewDialog(): void {
        this.displayPreviewDialog = false;
        this.selectedComplaint = null;
    }

    convertToOfficial(): void {
        if (this.selectedComplaint?.ID) {
            this.isConverting = true;
            this.publicComplaintsService.convertToOfficial(this.selectedComplaint.ID)
                .subscribe({
                    next: (response: any) => {
                        this.isConverting = false;
                        if (response?.rv === 0 && response?.Msg) {
                            this.toastr.error(response.Msg);
                            this.cdr.detectChanges();
                        } else if (response?.status > 0 || response?.rv > 0) {
                            this.toastr.success('تم استلام الشكوى بنجاح');
                            this.closePreviewDialog();
                            this.fetchComplaints();
                        }
                    },
                    error: () => {
                        this.isConverting = false;
                        this.toastr.error('حدث خطأ أثناء الاستلام');
                        this.cdr.detectChanges();
                    }
                });
        }
    }
}
