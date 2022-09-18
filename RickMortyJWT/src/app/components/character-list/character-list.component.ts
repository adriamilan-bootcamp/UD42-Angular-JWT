import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/service/characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  constructor(private characterService: CharactersService) { }

  characters: any = null;

  ngOnInit(): void {
    this.characterService.getCharacters()
      .subscribe(result => this.characters = result)
  }

}
