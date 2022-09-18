import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/service/characters.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  editId: boolean = false;

  adminView: boolean = false;

  public characterForm: FormGroup;

  constructor(private route: ActivatedRoute, private chservice: CharactersService, private fb: FormBuilder, private router: Router, private tokenStorageService: TokenStorageService) {
    this.characterForm = this.fb.group({
      name: '',
      status: '',
      species: '',
      gender: '',
      origin: '',
      image: ''
    })
  }

  idParam: any = null;

  character: any;

  ngOnInit(): void {

    this.idParam = this.route.snapshot.paramMap.get('id');

    this.chservice.getCharacter(this.idParam)
      .subscribe(
        data => {
          this.character = data;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )

      if(this.tokenStorageService.getRoles() == "\"admin\"") {
        this.adminView = true;
      } else {
        this.adminView = false;
      }
  }

  deleteCharacter() {
    this.chservice.delete(this.idParam)
      .subscribe(
        response => {
          console.log(response)
          this.router.navigate(['characters']);
        },
        error => {
          console.log(error)
        }
      )
  }

  validateData() {
    if (this.characterForm.get('name')?.value != null && this.characterForm.get('status')?.value != null && this.characterForm.get('species')?.value !=null && this.characterForm.get('gender')?.value != null && this.characterForm.get('origin')?.value != null && this.characterForm.get('image')?.value != null) {
      return true;
    } else {
      return false;
    }
  }

  editCharacter() {

    const data = {
      name: this.characterForm.get('name')?.value,
      status: this.characterForm.get('status')?.value,
      species: this.characterForm.get('species')?.value,
      gender: this.characterForm.get('gender')?.value,
      origin: this.characterForm.get('origin')?.value,
      image: this.characterForm.get('image')?.value
    }

    let validator = this.validateData()

    if (validator) {
      this.chservice.updateCharacter(this.idParam, data)
        .subscribe(
          response => {
            console.log(response)
            window.location.reload();
          },
          error => {
            console.log(error)
          }
        )
    }
  }

  edit() {
    if (this.editId) {
      this.editId = false
    } else {
      this.editId = true
    }
  }

}
