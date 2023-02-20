import { TestBed } from '@angular/core/testing';

import { FirebaseObjetService } from './firebase-objet.service';

describe('FirebaseObjetService', () => {
  let service: FirebaseObjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseObjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
