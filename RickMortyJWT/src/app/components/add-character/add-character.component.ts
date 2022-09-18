import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/service/characters.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { response } from 'express';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {

  public characterForm: FormGroup;

  adminView: boolean = false;

  constructor(private chservice: CharactersService, private fb: FormBuilder, private tokenStorageService: TokenStorageService) {
    this.characterForm = this.fb.group({
      name: '',
      status: '',
      species: '',
      gender: '',
      origin: '',
      image: ''
    })
  }

  ngOnInit(): void {
    if(this.tokenStorageService.getRoles() == "\"admin\"") {
      this.adminView = true;
    } else {
      this.adminView = false;
    }
  }

  character: Character = {
    name: '',
    status: '',
    species: '',
    gender: '',
    origin: '',
    image: ''
  }

  validateData() {
    if (this.characterForm.get('name')?.value != null && this.characterForm.get('status')?.value != null && this.characterForm.get('species')?.value !=null && this.characterForm.get('gender')?.value != null && this.characterForm.get('origin')?.value != null && this.characterForm.get('image')?.value != null) {
      return true;
    } else {
      return false;
    }
  }

  saveCharacter() {

    let validation = this.validateData();

    if (validation) {
      const data = {
        name: this.characterForm.get('name')?.value,
        status: this.characterForm.get('status')?.value,
        species: this.characterForm.get('species')?.value,
        gender: this.characterForm.get('gender')?.value,
        origin: this.characterForm.get('origin')?.value,
        image: this.characterForm.get('image')?.value
      }

      this.chservice.createCharacter(data)
        .subscribe(
          response => {
            console.log(response);
          }, 
          error => {
            console.log(error);
          } 
        )
    }
  }

}
