/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExhibitionService } from './exhibition.service';

describe('ExhibitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExhibitionService]
    });
  });

  it('should ...', inject([ExhibitionService], (service: ExhibitionService) => {
    expect(service).toBeTruthy();
  }));
});
