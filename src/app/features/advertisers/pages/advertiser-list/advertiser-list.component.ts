import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdvertiserApiService } from '../../services/advertiser-api.service';
import { Advertiser } from '../../models/advertiser.model';
import { MatDialog } from '@angular/material/dialog';
import { NewAdvertiserComponent } from '../../components/new-advertiser/new-advertiser.component';
import { AdvertiserWithAddress } from '../../models/advertiser-with-address.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cvtr-advertiser-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatButtonModule],
  templateUrl: './advertiser-list.component.html',
  styleUrl: './advertiser-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiserListComponent implements OnInit {
  advertisers: Advertiser[] = [];
  displayedColumns = ['name', 'orgurl', 'telephone', 'address', 'postcode'];
  dataSource = new MatTableDataSource<Advertiser>([]);

  private readonly dialog = inject(MatDialog);
  private readonly advertisersApi = inject(AdvertiserApiService);

  ngOnInit(): void {
    this.advertisersApi.advertisers$.subscribe(advertisers => {
      this.advertisers = advertisers;
      this.dataSource.data = advertisers;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewAdvertiserComponent);

    dialogRef.afterClosed().subscribe((advertiser: AdvertiserWithAddress) => {
      this.advertisersApi.addAdvertiser(advertiser);
      console.log('The dialog was closed', advertiser);
    });
  }
}
