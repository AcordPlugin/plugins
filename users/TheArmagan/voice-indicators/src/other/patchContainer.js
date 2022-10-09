class Patches {
  constructor () {
    this.patches = [];
  }
  add(...unPatchers) {
    this.patches.push(...unPatchers);
  }
  remove(unPatcher) {
    let [f] = this.patches.splice(this.patches.indexOf(i => i == unPatcher), 1);
    f();
  }
  removeAll() {
    let l = this.patches.splice(0, this.patches.length);
    for (let i = 0; i < l.length; i++) {
      l[i]();
    }
  }
}

export default new Patches();