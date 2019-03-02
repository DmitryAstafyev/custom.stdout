import { StdoutController } from '../src/stdout';

const stdout = new StdoutController(process.stdout);

function logs() {
    setTimeout(() => {
        stdout.out(`${Math.random().toFixed(10)}-${Math.random().toFixed(10)}-${Math.random().toFixed(10)}-${Math.random().toFixed(10)}`);
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

logs();
fixedAreaA();
//fixedAreaB();
