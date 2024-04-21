import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertiserListComponent } from './advertiser-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdvertiserApiService } from '../../services/advertiser-api.service';
import { BehaviorSubject, of } from 'rxjs';
import { NewAdvertiserComponent } from '../../components/new-advertiser/new-advertiser.component';
import { AdvertiserWithAddress } from '../../models/advertiser-with-address.model';
import { Advertiser } from '../../models/advertiser.model';

describe('AdvertiserListComponent', () => {
  let component: AdvertiserListComponent;
  let fixture: ComponentFixture<AdvertiserListComponent>;
  let mockDialog: MatDialog;
  let mockAdvertiserApiService: AdvertiserApiService;
  let advertisersSubject: BehaviorSubject<Advertiser[]>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj(['open']);
    mockAdvertiserApiService = jasmine.createSpyObj(['addAdvertiser']);
    advertisersSubject = new BehaviorSubject<Advertiser[]>([]);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, AdvertiserListComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: AdvertiserApiService, useValue: mockAdvertiserApiService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserListComponent);
    component = fixture.componentInstance;
    (mockAdvertiserApiService.advertisers$ as unknown) = advertisersSubject.asObservable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when openDialog() is called', () => {
    const mockDialogRef = jasmine.createSpyObj({ afterClosed: of(null) });
    (mockDialog.open as jasmine.Spy).and.returnValue(mockDialogRef);

    component.openDialog();

    expect(mockDialog.open).toHaveBeenCalledWith(NewAdvertiserComponent);
  });

  it('should add advertiser on dialog close', () => {
    const mockAdvertiser: AdvertiserWithAddress = {
      name: 'test-name',
      orgurl: 'test-org',
      telephone: '01234445555',
      address: 'test-address',
      city: 'test-city',
      postcode: 'test-postcode',
    };
    (mockDialog.open as jasmine.Spy).and.returnValue({
      afterClosed: () => of(mockAdvertiser),
    });

    component.openDialog();

    expect(mockAdvertiserApiService.addAdvertiser).toHaveBeenCalledWith(mockAdvertiser);
  });

  it('should update dataSource on initialization', () => {
    const mockAdvertisers: Advertiser[] = [
      { id: 1, name: 'test-n1', orgurl: 'test-o1', telephone: '01234445555', address: 'test-a1', postcode: 'test-p1' },
      { id: 2, name: 'test-n2', orgurl: 'test-o2', telephone: '01234445556', address: 'test-a2', postcode: 'test-p2' },
      { id: 3, name: 'test-n3', orgurl: 'test-o3', telephone: '01234445557', address: 'test-a3', postcode: 'test-p3' },
    ];
    advertisersSubject.next(mockAdvertisers);

    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(mockAdvertisers);
  });
});
