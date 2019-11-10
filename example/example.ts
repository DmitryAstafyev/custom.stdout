import { StdoutController } from '../src/stdout';

const stdout = new StdoutController(process.stdout, { handleStdoutGlobal: true});
const bar1 = stdout.createProgressBar();
const bar2 = stdout.createProgressBar({ caption: 'Operation #2', width: 60 });

function logs() {
    setTimeout(() => {
        stdout.out(`${Math.random().toFixed(10)}-${Math.random().toFixed(10)}-${Math.random().toFixed(10)}-${Math.random().toFixed(10)}`);
        console.log('HEY!\n', { ffff: 'fdfd '});
        logs();
    }, 100 + Math.random() * 250);
}

function fixedAreaA() {
    setTimeout(() => {
        stdout.out(`\n${'-'.repeat(40)}\nParameter A.0: ${Math.random().toFixed(10)}\nParameter A.1: ${Math.random().toFixed(10)}`, 'area_a');
        fixedAreaA();
    }, 500 + Math.random() * 500);
}

function fixedAreaB() {
    setTimeout(() => {
        stdout.out(`\tParameter B.0: ${Math.random().toFixed(10)}\n\tParameter B.1: ${Math.random().toFixed(10)}\n\tParameter B.2: ${Math.random().toFixed(10)}`, 'area_b');
        fixedAreaB();
    }, 500 + Math.random() * 500);
}

function progress1() {
    setTimeout(() => {
        bar1.tick();
        progress1();
    }, 100 + Math.random() * 250);
}
function progress2() {
    setTimeout(() => {
        bar2.tick();
        progress2();
    }, 100 + Math.random() * 150);
}
progress1();
progress2();
logs();
fixedAreaA();
// fixedAreaB();
